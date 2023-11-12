
class GameData {

    /* Constructor
    * gameList should be a 9-long array of arrays
    * Each array is also 9 long and contains either another GameData, or zero to one character long strings
    * Each string is either '', 'x', or '0'
    * user1 should be the username of user1 (could be logged in user or opponent)
    * user2 should be the username of user2 (could be logged in user or opponent)
    * userTurn should be 1 or 2, indicating which user's turn it is */
    constructor(id, gameList, user1, user2, userTurn) {
        // this.topLeft = gameList[0][0];
        // this.topMiddle = gameList[0][1];
        // this.topRight = gameList[0][2];

        // this.midLeft = gameList[1][0];
        // this.midMiddle = gameList[1][1];
        // this.midRight = gameList[1][2];

        // this.bottomLeft = gameList[2][0];
        // this.bottomMiddle = gameList[2][1];
        // this.bottomRight = gameList[2][2];

        this.id = id;

        this.gameList = gameList;

        this.user1 = user1;
        this.user2 = user2;

        this.turn = userTurn;
    }

    // If the square to be marked is empty, mark it. If it is the next layer of the game, return that board.
    markSquare(row, column, mark) {
        if (typeof(mark) == 'string' && typeof(this.gameList[row][column]) == 'string' && this.gamelist[row][column] === '') {
            this.gameList[row][column] = mark;
        } else if (typeof(this.gameList[row][column] == 'object')) {
            // return the corresponding GameData
            return gameList[row][column];
        }
    }

}