const { MongoClient, ObjectId } = require('mongodb');

class DatabaseAccess {

    #db;

    constructor(config) {
        const url = `mongodb+srv://${config.userName}:${config.password}@${config.cluster}.${config.hostname}`;
        const client = new MongoClient(url);
        
        this.#db = client.db('tictactoe');

        // test connection
        client.connect().then((_mongoClient) => this.#db.command({ping: 1})).catch((ex) => { 
            console.log(`Unable to connect to database with ${url} because ${ex.message}`);
            process.exit(1);
        });
    }

    // getUser(email) {
    //     return collection.findOne({ email: email });
    // }
    
    async createUser(email, password) {
        const user = {
            email: email,
            password: password,
            token: 'xxx',
        };
        return collection.insertOne(user);
    }

    async getGames(requestingUser) {
        const gamesCollection = this.#db.collection('games');

        const query = {$or: [
                {user1: requestingUser},
                {user2: requestingUser}
            ]};
        const options = {limit: 10,};
        const cursor = gamesCollection.find(query, options);
        const resultGames = await cursor.toArray();
        console.log(`getGames result: ${resultGames}`);
        console.log(`first game user1: ${resultGames[0]['gameData']}`);
        return resultGames;
    }

    async getGame(gameId) {
        const gamesCollection = this.#db.collection('games');
        const cursor = gamesCollection.find({_id: new ObjectId(gameId)});
        const resultArray = await cursor.toArray();

        return resultArray[0];
    }

    async createGame(requestingUser, opponentUser) {
        const gamesCollection = client.db('tictactoe').collection('games');
        gamesCollection.insertOne({user1: requestingUser, user2: opponentUser, gameData: EMPTY_GAME, userTurn: 0});
    }

    async acceptGame(gameId) {
        const gamesCollection = this.#db.collection('games');

        const result = await gamesCollection.updateOne({_id: new ObjectId(gameId)}, {$set: {userTurn: 2}});

        if (result.matchedCount && result.modifiedCount) {
            return true;
        } else {
            return false;
        }
    }

    async rejectGame(gameId) {
        const gamesCollection = this.#db.collection('games');
        const result = await gamesCollection.deleteOne({_id: new ObjectId(gameId)});

        return result.deletedCount === 1;
    }

    async updateGame(gameId, mark, position) {
        const gamesCollection = client.db('tictactoe').collection('games');

        const cursor = gamesCollection.find({_id: new ObjectId(gameId)});

        const resultArray = await cursor.toArray();

        if (gameId && resultArray.length > 0) {
            // position is expected to be a map with the first game layer and second game layer grid numbers 
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

            return true;
        } else {
            return false;
        }
    }
}

module.exports = { DatabaseAccess };