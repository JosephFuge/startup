const PORT_NUM = process.argv.length > 2 ? process.argv[2] : 4000;

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
    });
}

apiRouter.post('/auth/create', async (req, res) => {
    if (await ticDB.getUser(req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await ticDB.createUser(req.body.email, req.body.password);

        // Set the cookie
        setAuthCookie(res, user.token);

        res.send({
        id: user._id,
        });
    }
});

app.post('/auth/login', async (req, res) => {
    const user = await ticDB.getUser(req.body.email);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

app.get('/user/me', async (req, res) => {
    authToken = req.cookies['token'];
    const user = await collection.findOne({ token: authToken });
    if (user) {
      res.send({ email: user.email });
      return;
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// Send games for a particular user
apiRouter.post('/fetchGames', async (req, res) => {
    const requestingUser = req.body['user'];

    const resultGames = await ticDB.getGames(requestingUser);

    res.send(resultGames);
});

// Create new game
apiRouter.post('/createGame', async (req, res) => {
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
apiRouter.post('/updateGame', async (req, res) => {
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
apiRouter.post('/fetchGame', async (req, res) => {
    const gameId = req.body['gameId'];
    
    if (gameId) {
        const resultGame = await ticDB.getGame(gameId);
        if (resultGame) {
            res.status(200).send(resultArray[0]);
        }
    }

    res.status(400).json({message: 'Game doesn\'t exist'});
});

apiRouter.post('/acceptGame', async (req, res) => {
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

apiRouter.post('/rejectGame', async (req, res) => {
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