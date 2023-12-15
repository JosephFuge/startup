import React from 'react';

import { getUserGames } from '../databaseAccess';
import { GameCard } from './gamecard';

export function GameSelect({ currentUser }) {
    const [games, setGames] = React.useState([]);

    React.useEffect(() => {

        getUserGames().then((gamesData) => {
            setGames(gamesData);
        }).catch();
      }, []);
    
    let gamesEl = '';

    return (
        <main>
        <div id="gameSelectContent" className="select-body">
            <h2>Select a Game</h2>
            {games.map((game, index) => (
                <GameCard 
                    key={index} 
                    gameData={game}
                    currentUser={currentUser}
                />
            ))}
            <div id="createNewGame">
                <a className="rounded-button" id="newGame" href="/creategame"><input type="submit" value="New Game +" /></a>
            </div>
        <br />
    </div></ main>
    );
}
