const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');
url = `mongodb+srv://${config.userName}:${config.password}@${config.cluster}.${config.hostname}`;
const PORT_NUM = process.argv.length > 2 ? process.argv[2] : 4000;

const client = new MongoClient(url);
const db = client.db('tictactoe');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

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
const gamesData =  [{user1: 'Joseph', user2: "Jennifer", userTurn: 1, id: 1, gameData: [
    ['', '', '', '', 'x', '', 'o', 'o', ''], 
    ['x', '', 'o', '', 'x', '', 'o', '', 'x'],
    ['o', '', '', '', 'x', '', 'o', '', ''],
    ['x', '', '', '', 'x', '', 'o', '', ''],
    ['o', '', '', '', 'o', '', 'x', '', ''],
    ['x', '', 'o', '', '', 'x', 'o', '', ''],
    ['o', '', '', 'x', '', '', '', '', 'o'],
    ['', '', '', '', '', '', '', '', ''],
    ['', 'o', '', '', 'x', '', '', '', '']]}, {user1: "Marcos", user2: 'Joseph', userTurn: 1, id: 2, gameData: [
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
    {user1: 'Joseph', user2: "Ronald", userTurn: 0, id: 3, gameData: EMPTY_GAME}
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
apiRouter.post('/fetchGames', async (req, res) => {
    const requestingUser = req.body['user'];
    // let userGames = [];
    // for (game of gamesData) {
    //     if (game['user1'] === requestingUser || game['user2'] === requestingUser) {
    //         userGames.push(game);
    //     }
    // }

    /*
    const gamesData: {
        user1: string;
        user2: string;
        userTurn: number;
        id: number;
        gameData: string[][];
    }[]
    */

    const gamesCollection = client.db('tictactoe').collection('games');

    const query = {$or: [
            {user1: requestingUser},
            {user2: requestingUser}
        ]};
    const options = {limit: 10,};
    const cursor = gamesCollection.find(query, options);
    const resultGames = await cursor.toArray();
    res.send(resultGames);
});

// Create new game
apiRouter.post('/createGame', (req, res) => {
    if (req.body['requestingUser'] && req.body['opponentUser']) {
        const gamesCollection = client.db('tictactoe').collection('games');
        gamesCollection.insertOne({user1: req.body['requestingUser'], user2: req.body['opponentUser'], gameData: EMPTY_GAME, userTurn: 0});
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
    const gamesCollection = client.db('tictactoe').collection('games');

    const cursor = gamesCollection.find({_id: new ObjectId(gameId)});

    const resultArray = await cursor.toArray();

    if (gameId && resultArray.length > 0) {
        if (req.body['mark'] && (req.body['mark'] === 'o' || req.body['mark'] === 'x') && req.body['position']) {
            const mark = req.body['mark'];
            // position is expected to be a map with the first game layer and second game layer grid numbers 
            const position = req.body['position'];
            const userTurn = resultArray[0]['userTurn'];

            let gamePos = "";
            
            let setter = {};
            if (position['layer2'] === -1) {
                gamePos = "gameData.0." + (position['layer1'] - 1).toString();
            } else {
                gamePos = "gameData." + position['layer1'].toString() + "." + position['layer2'].toString();
            }

            setter[gamePos] = mark;
            setter['userTurn'] = userTurn === 1 ? 2 : 1;

             // const preUpdateResult = await gamesCollection

            const result = await gamesCollection.updateOne(
                { _id: new ObjectId(gameId) },
                { $set: setter }
            );

            res.status(200).json({message: 'Game updated successfully'});
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
    const gamesCollection = client.db('tictactoe').collection('games');

    const cursor = gamesCollection.find({_id: new ObjectId(gameId)});

    const resultArray = await cursor.toArray();

    if (resultArray.length > 0) {

        res.status(200).send(resultArray[0]);
    } else {
        res.status(400).json({message: 'Game doesn\'t exist'});
    }
});

apiRouter.post('/acceptGame', async (req, res) => {
    const gameId = req.body['gameId'];
    const gamesCollection = client.db('tictactoe').collection('games');

    const result = await gamesCollection.updateOne({_id: new ObjectId(gameId)}, {$set: {userTurn: 2}});

    if (result.matchedCount && result.modifiedCount) {
        res.status(200).json({message: "Success"});
    } else {
        res.status(400).json({message: 'Game doesn\'t exist'});
    }
});

apiRouter.post('/rejectGame', async (req, res) => {
    const gameId = req.body['gameId'];
    const gamesCollection = client.db('tictactoe').collection('games');

    const result = await gamesCollection.deleteOne({_id: new ObjectId(gameId)});

    if (result.deletedCount === 1) {
        res.status(200).json({message: "Success"});
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