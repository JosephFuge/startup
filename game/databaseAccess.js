function getUserGames() {
    // TODO: In future updates, pull game data from database and not from constants
    const currentUser = localStorage.getItem("username");

    const userGameData1 = [{user1: currentUser, user2: "Jennifer", userTurn: 1, gameData: [
        ['x', '', '', '', 'x', '', 'o', '', ''], 
        ['x', '', 'o', '', 'x', '', 'o', '', 'x'],
        ['o', '', '', '', 'x', '', 'o', '', ''],
        ['x', '', '', '', 'x', '', 'o', '', ''],
        ['o', '', '', '', 'o', '', 'x', '', ''],
        ['x', '', 'o', '', '', 'x', 'o', '', ''],
        ['o', '', '', 'x', '', '', '', '', 'o'],
        ['', '', '', '', '', '', '', '', ''],
        ['', 'o', '', '', 'x', '', '', '', '']]}];

    
    const userGameData2 = [{user1: "Marcos", user2: currentUser, userTurn: 1, gameData: [
        ['', '', '', '', 'x', '', '', '', ''], 
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '']]}];

        // A userTurn of 0 means the game has not been started yet because it hasn't been accepted by the other user
    const userGameData3 = [{user1: currentUser, user2: "Ronald", userTurn: 0, gameData: [
        ['', '', '', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '']]}];
    
    const games = [new GameData(userGameData1.gameData, userGameData1.user1, userGameData1.user2, userGameData1.userTurn), 
        new GameData(userGameData2.gameData, userGameData2.user2, userGameData2.user2, userGameData2.userTurn),
        new GameData(userGameData3.gameData, userGameData3.user2, userGameData3.user2, userGameData3.userTurn)];

    return games;
}