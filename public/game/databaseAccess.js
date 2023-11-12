async function getUserGames() {
    // TODO: In future updates, pull game data from database and not from constants
    const currentUser = localStorage.getItem("username");
    
    const storedGames = JSON.parse(localStorage.getItem("localGames"));
    console.log('storedGames: ' + storedGames);

    let gamesResponse = await fetch('/api/fetchGames', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({user: currentUser}),
      });

    let games = await gamesResponse.json();

    if (storedGames) {
        games = games.concat(storedGames);
    }

    games = Array.from(games.map((tempGame) => new GameData(tempGame['id'], tempGame['gameData'], tempGame['user1'], tempGame['user2'], tempGame['userTurn'])));

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