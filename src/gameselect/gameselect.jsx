import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUserGames } from '../databaseAccess';
import { GameCard } from './gamecard';

export function GameSelect({ currentUser }) {
    const [games, setGames] = React.useState([]);

    React.useEffect(() => {

        getUserGames().then((gamesData) => {
            setGames(gamesData);
        }).catch();
      }, []);

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
                <NavLink className="rounded-button" id="newGame" to="/creategame">New Game +</NavLink>
            </div>
        <br />
    </div></ main>
    );
}
