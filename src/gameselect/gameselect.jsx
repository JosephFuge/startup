import React from 'react';

import { getUserGames } from '../databaseAccess';
import { GameCard } from './gamecard';

export function GameSelect() {
    const [games, setGames] = React.useState('');

    React.useEffect(() => {

        getUserGames().then((gamesData) => {
            console.log(`Fetched Data!\n ${gamesData}`);
            setGames(gamesData);
        }).catch();
      }, []);
    
    let gameEl = '';

    if (games) {
        gameEl = <GameCard gameData={games[0]} />;
    }

    return (
        <main>
        <div id="gameSelectContent" className="select-body">
            {gameEl}
            <div id="createNewGame">\
                <a className="rounded-button" id="newGame" href="/creategame"><input type="submit" value="New Game +" /></a>
            </div>
        <br />
    </div></ main>
    );
}
