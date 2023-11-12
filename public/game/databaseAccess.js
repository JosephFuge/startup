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

    // if (storedGames) {
    //     games = games.concat(storedGames);
    // }

    games = Array.from(games.map((tempGame) => new GameData(tempGame['id'], tempGame['gameData'], tempGame['user1'], tempGame['user2'], tempGame['userTurn'])));

    return games;
}

async function saveNewGame(newGameData) {
    // Save a newly created game.
    let newGames = [newGameData];
    const currentGames = JSON.parse(localStorage.getItem("localGames"));
    if (currentGames) {
        newGames = newGames.concat(currentGames);
    }
    localStorage.setItem("localGames", JSON.stringify(newGames));
    fetch('/api/createGame', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({requestingUser: newGameData.user1, opponentUser: newGameData.user2})
    });
}

function updateGame(gameId, mark, position) {
    fetch('/api/updateGame', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({gameId: gameId, mark: mark, position: position}),
      });
}

async function fetchSpecificGame(gameId) {
    let gameResponse = await fetch('/api/fetchGame', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({gameId: gameId}),
    });
    let game = await gameResponse.json();
    return new GameData(game['id'], game['gameData'], game['user1'], game['user2'], game['userTurn']);
}