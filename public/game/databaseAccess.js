function getUserGames() {
    // TODO: In future updates, pull game data from database and not from constants
    const currentUser = localStorage.getItem("username");

    
    
    const storedGames = JSON.parse(localStorage.getItem("games"));
    console.log('storedGames: ' + storedGames);

    let games = [new GameData(userGameData1.gameData, userGameData1.user1, userGameData1.user2, userGameData1.userTurn), 
        new GameData(userGameData2.gameData, userGameData2.user2, userGameData2.user2, userGameData2.userTurn),
        new GameData(userGameData3.gameData, userGameData3.user2, userGameData3.user2, userGameData3.userTurn)];

    if (storedGames) {
        games = games.concat(storedGames);
    }

    return games;
}

function saveNewGame(newGameData) {
    // Save a newly created game.
    // TODO: Save to database instead of localStorage. 
    let newGames = [newGameData];
    const currentGames = JSON.parse(localStorage.getItem("localGames"));
    if (currentGames) {
        newGames = newGames.concat(currentGames);
    }
    localStorage.setItem("localGames", JSON.stringify(newGames));
}