const PORT_NUM = process.argv.length > 2 ? process.argv[2] : 4000;

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

// Mock game data
const gamesData =  [{user1: currentUser, user2: "Jennifer", userTurn: 1, id: 1, gameData: [
    ['x', '', '', '', 'x', '', 'o', '', ''], 
    ['x', '', 'o', '', 'x', '', 'o', '', 'x'],
    ['o', '', '', '', 'x', '', 'o', '', ''],
    ['x', '', '', '', 'x', '', 'o', '', ''],
    ['o', '', '', '', 'o', '', 'x', '', ''],
    ['x', '', 'o', '', '', 'x', 'o', '', ''],
    ['o', '', '', 'x', '', '', '', '', 'o'],
    ['', '', '', '', '', '', '', '', ''],
    ['', 'o', '', '', 'x', '', '', '', '']]}, {user1: "Marcos", user2: currentUser, userTurn: 1, id: 2, gameData: [
    ['', '', '', '', 'x', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '']]},
    // A userTurn of 0 means the game has not been started yet because it hasn't been accepted by the other user
    {user1: currentUser, user2: "Ronald", userTurn: 0, id: 3, gameData: EMPTY_GAME}
    ];



const express = require('express');
const app = express();

// JSON parsing middleware
app.use(express.json());

// Frontend static middleware
app.use(express.static('public'));

// API listener middleware
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Send games for a particular user
apiRouter.post('/fetchGames', (req, res) => {
    const requestingUser = req.body['user'];
    let usergames = [];
    for (game of gamesData) {
        if (game[user1] === requestingUser || game[user2] === requestingUser) {
            usergames.push(game);
        }
    }
    res.send(userGames);
});

// Create new game
apiRouter.post('/createGame', (req, res) => {
    if (req.body['requestingUser'] && req.body['opponentUser']) {
        let maxId = gamesData.reduce((maxIdGame, newIdGame) => Math.max(maxIdGame.id, newIdGame.id)).id;
        gamesData.push({user1: req.body['requestingUser'], user2: req.body['opponentUser'], id: maxId + 1, gameData: EMPTY_GAME});
        res.status(201).json({message: 'Success'});
    } else {
        res.status(400).json({message: 'Requesting user or opponent user doesn\'t exist'});
    }
});

// Update a game with new moves
apiRouter.post('/updateGame', (req, res) => {
    const gameId = req.body['gameId'];
    if (gameId && Array.from(gamesData.map((game) => game.id)).includes(gameId)) {
        if (req.body['mark'] && (req.body['mark'] === 'o' || req.body['mark'] === 'x') && req.body['position']) {
            const mark = req.body['mark'];
            // position is expected to be a map with the first game layer and second game layer grid numbers 
            const position = req.body['position'];
            for (game of gamesData) {
                if (game.id === gameId) {
                    if (position['layer2'] === -1) {
                        game.gameData[0][position['layer1']] = mark;
                    } else {
                        game.gameData[position['layer1']][position['layer2']] = mark;
                    }
                }
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
apiRouter.post('/fetchGame', (req, res) => {
    
});

app.listen(PORT_NUM, () => console.log(`Server is listening on port ${PORT_NUM}`));