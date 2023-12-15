import { GameData } from './models';

async function getUserGames() {
    const currentUser = localStorage.getItem("username");
    
    const storedGames = JSON.parse(localStorage.getItem("localGames"));

    let gamesResponse = await fetch('/api/auth/fetchGames', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({user: currentUser}),
      });

    let games = await gamesResponse.json();

    // if (storedGames) {
    //     games = games.concat(storedGames);
    // }

    if (games.length > 0) {
        games = Array.from(games.map((tempGame) => new GameData(tempGame['_id'], tempGame['gameData'], tempGame['user1'], tempGame['user2'], tempGame['userTurn'])));

        return games;
    } else {
        return [];
    }
}

async function saveNewGame(newGameData) {
    // Save a newly created game.
    console.log(newGameData);
    await fetch('/api/auth/createGame', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({requestingUser: newGameData.user1, opponentUser: newGameData.user2})
    });
}

function updateGame(gameId, mark, position) {
    fetch('/api/auth/updateGame', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({gameId: gameId, mark: mark, position: position}),
      });
}

async function acceptOrRejectGame(isAccept, gameId) {
    if (isAccept) {
        const resultResponse = await fetch('/api/auth/acceptGame', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({gameId: gameId}),
          });
        const result = await resultResponse.json();
        if (result['message'] === 'Success') {
            localStorage.setItem('currentGameId', gameId);
            window.location.href = "/playgame";
        }
    } else {
        fetch('/api/auth/rejectGame', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({gameId: gameId}),
          });
    }
}

async function fetchSpecificGame(gameId) {
    let gameResponse = await fetch('/api/auth/fetchGame', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({gameId: gameId}),
    });
    let game = await gameResponse.json();
    return new GameData(game['_id'], game['gameData'], game['user1'], game['user2'], game['userTurn']);
}

export { getUserGames, saveNewGame, updateGame, acceptOrRejectGame, fetchSpecificGame };