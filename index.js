const PORT_NUM = process.argv.length > 2 ? process.argv[2] : 4000;
const bcrypt = require('bcrypt');
const { DatabaseAccess } = require('./dbAccess.js');

const config = require('./dbConfig.json');
const ticDB = new DatabaseAccess(config);

const EMPTY_GAME = [
    ['', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '']];


const express = require('express');
const app = express();

// JSON parsing middleware
app.use(express.json());

// Use the cookie parser middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Prevent client from getting to game subfiles
app.get('/game/*', (req, res) => {
    console.log(`originalUrl: ${req.originalUrl}`);
    let newUrl = req.originalUrl.substring(req.originalUrl.indexOf('/game/') + '/game/'.length);
    if (newUrl.endsWith('.html')) {
        newUrl = newUrl.substring(0, newUrl.indexOf('.html'));
    }
    res.redirect(`/${newUrl}`);
});

// Frontend static middleware
app.use(express.static('public'));

// API listener middleware
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

function setAuthCookie(res, authToken) {
    res.cookie('token', authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
        path: '/'
    });
}

app.post('/register', async (req, res) => {
    if (await ticDB.getUser(req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await ticDB.createUser(req.body.email, req.body.password);

        // Set the cookie
        setAuthCookie(res, user.token);

        res.status(200).send({
            id: user._id,
        });
    }
});


app.post('/login', async (req, res) => {
    const user = await ticDB.getUser(req.body.email);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.status(200).send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

async function checkAuth (req, res, next) {
    try {
      authToken = req.cookies['token'];
      console.log(`token: ${authToken}`);
      const user = await ticDB.getUserByToken(authToken);
      if (user) {
        next();
      } else {
        res.status(401).sendFile('unauthorized.html', { root: 'public' });
      }
    } catch (error) {
        res.status(401).sendFile('unauthorized.html', { root: 'public' });
    }
  }

const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use('/api/auth', checkAuth);
// secureApiRouter.use('/game', checkAuth);

app.get('/playgame', checkAuth, (_req, res) => {
    res.sendFile('/game/playgame.html', { root: 'public' });
});

app.get('/gameselect', checkAuth, (_req, res) => {
    res.sendFile('/game/gameselect.html', { root: 'public' });
});

app.get('/creategame', checkAuth, (_req, res) => {
    res.sendFile('/game/creategame.html', { root: 'public' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
    console.log('hit logout');
    res.clearCookie('token');
    res.status(204).end();
});

app.get('/user/me', async (req, res) => {
    authToken = req.cookies['token'];
    if (authToken) {
        const user = ticDB.getUserByToken(authToken);
        if (user) {
            res.send({ email: user.email });
            return;
        }
    } else {
        res.status(400).send({msg: 'No authtoken received'});
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// Send games for a particular user
apiRouter.post('/auth/fetchGames', async (req, res) => {
    const requestingUser = req.body['user'];

    const resultGames = await ticDB.getGames(requestingUser);

    res.send(resultGames);
});

// Create new game
apiRouter.post('/auth/createGame', async (req, res) => {
    if (req.body['requestingUser'] && req.body['opponentUser']) {
        await ticDB.createGame(req.body['requestingUser'], req.body['opponentUser']);
        res.status(201).json({message: 'Success'});
    } else {
        res.status(400).json({message: 'Requesting user or opponent user doesn\'t exist'});
    }
});

// Update a game with new moves
// Expecting:
    // gameId - number
    // mark - string, 'o' or 'x'
    // position - {layer1: number, layer2: number}
apiRouter.post('/auth/updateGame', async (req, res) => {
    const gameId = req.body['gameId'];
    if (gameId) {
        if (req.body['mark'] && req.body['position'] && (req.body['mark'] === 'x' || req.body['mark'] === 'o')) {
            const updateSuccess = await ticDB.updateGame(gameId, req.body['mark'], req.body['position']);
            if (updateSuccess === true) {
                res.status(200).json({message: 'Game updated successfully'});
            } else {
                res.status(500).json({message: 'Failed to update game'});
            }
        } else {
            res.status(400).json({message: 'Bad mark or square position'});
        }
    } else {
        res.status(400).json({message: 'Game doesn\'t exist'});
    }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Send data for specific game
apiRouter.post('/auth/fetchGame', async (req, res) => {
    const gameId = req.body['gameId'];
    
    if (gameId) {
        const resultGame = await ticDB.getGame(gameId);
        if (resultGame) {
            res.status(200).send(resultGame);
            return;
        }
    }

    res.status(400).json({message: 'Game doesn\'t exist'});
});

apiRouter.post('/auth/acceptGame', async (req, res) => {
    const gameId = req.body['gameId'];

    if (gameId) {
        const isSuccessful = await ticDB.acceptGame(gameId);
        if (isSuccessful) {
            res.status(200).json({message: "Success"});
        } else {
            res.status(400).json({message: "Unsuccessful - game ID may be invalid"});
        }
    } else {
        res.status(400).json({message: 'Game doesn\'t exist'});
    }
});

apiRouter.post('/auth/rejectGame', async (req, res) => {
    const gameId = req.body['gameId'];

    
    if (gameId) {
        const isSuccessful = await ticDB.rejectGame(gameId);
        if (isSuccessful) {
            res.status(200).json({message: "Success"});
        } else {
            res.status(400).json({message: 'Unsuccesful - game ID may be invalid'});
        }
    } else {
        res.status(400).json({message: 'Game doesn\'t exist'});
    }
});

function getGameDataFormatted(gameData) {
    let output = 'Board 0\n';
    for (let i = 0; i < 1; i++) {
        for (let j = 0; j < gameData[i].length; j++) {
            if (gameData[i][j].length > 0 && (gameData[i][j] === 'x' || gameData[i][j] === 'o')) {
                output += gameData[i][j];
            } else {
                output += '_';
            }
            if (j % 3 == 0) {
                output += '\n';
            }
        }
        output += '\nBoard ' + (i + 1) + '\n';
    }
    return output;
}

app.listen(PORT_NUM, () => console.log(`Server is listening on port ${PORT_NUM}`));