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

    console.log(`pre-conversion games: ${games}`);
    if (games.length > 0) {
        games = Array.from(games.map((tempGame) => new GameData(tempGame['_id'], tempGame['gameData'], tempGame['user1'], tempGame['user2'], tempGame['userTurn'])));

        console.log(games);
        return games;
    } else {
        return [];
    }
}

async function saveNewGame(newGameData) {
    // Save a newly created game.
    // let newGames = [newGameData];
    // let currentGames = localStorage.getItem("localGames");
    // const currentGamesObj = JSON.parse();
    // if (currentGames && currentGamesObj) {
    //     newGames = newGames.concat(currentGamesObj);
    // }
    // localStorage.setItem("localGames", JSON.stringify(newGames));
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

async function acceptOrRejectGame(isAccept, gameId) {
    if (isAccept) {
        const resultResponse = await fetch('/api/acceptGame', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({gameId: gameId}),
          });
        const result = await resultResponse.json();
        if (result['message'] === 'Success') {
            localStorage.setItem('currentGameId', gameId);
            window.location.href = "playgame.html";
        }
    } else {
        fetch('/api/rejectGame', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({gameId: gameId}),
          });
    }
}

async function fetchSpecificGame(gameId) {
    let gameResponse = await fetch('/api/fetchGame', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({gameId: gameId}),
    });
    let game = await gameResponse.json();
    return new GameData(game['_id'], game['gameData'], game['user1'], game['user2'], game['userTurn']);
}