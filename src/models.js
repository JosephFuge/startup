
class GameData {

    /* Constructor
    * gameList should be a 9-long array of arrays
    * Each array is also 9 long and contains either another GameData, or zero to one character long strings
    * Each string is either '', 'x', or '0'
    * user1 should be the username of user1 (could be logged in user or opponent)
    * user2 should be the username of user2 (could be logged in user or opponent)
    * userTurn should be 1 or 2, indicating which user's turn it is */
    constructor(id, gameList, user1, user2, userTurn) {

        this.id = id;

        this.gameList = gameList;

        this.user1 = user1;
        this.user2 = user2;

        this.turn = userTurn;
    }

}

export { GameData };