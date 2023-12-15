import React from 'react';

import { setUpGame, markSquare, sendEmoji } from './playgamefunctionality';
import { GameData } from '../models';
import { fetchSpecificGame } from '../databaseAccess';
import './playgame.css';

export function PlayGame() {
    const [thisGame, setThisGame] = React.useState(new GameData());
    const currentUser = localStorage.getItem('username');
    // const thisGameId = localStorage.getItem('currentGameId');
    // const thisGameId = localStorage.getItem('currentGameId');

    React.useEffect(() => {
        const thisGameId = localStorage.getItem('currentGameId');
        fetchSpecificGame(thisGameId).then((thisGameData) => {
            setThisGame(thisGameData);
            setUpGame(thisGameData);
        }).catch();
      }, []);

    return (
        <main>
            <h2 id="userTurnHeader"></h2>
            <div id="gameBoard">
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">

                    <g>
                    <title>Bars</title>
                    <rect id="svg_1" height="518" width="37" y="36" x="305" stroke="#000" fill="currentColor"/>
                        <rect id="svg_2" height="518" width="37" y="36" x="512" stroke="#000" fill="currentColor"/>
                        <rect transform="rotate(-90 422.5 184)" id="svg_3" height="518" width="37" y="-75" x="404" stroke="#000" fill="currentColor"/>
                        <rect transform="rotate(-90 422.5 402)" id="svg_4" height="518" width="37" y="143" x="404" stroke="#000" fill="currentColor"/>
                    </g>

                    <g id="marksGroup">
                        <title>Marks</title>
                        <path className="tictactoe-square circleMark" stroke="none" fill="currentColor" id="square_1" onClick={()=>{markSquare(thisGame.user1 === currentUser, 1, true);}} d="m170.32499,94.8975l0,0c0,-34.51779 27.98221,-62.5 62.5,-62.5l0,0c16.57602,0 32.47315,6.5848 44.19417,18.30582c11.72103,11.72103 18.30584,27.61814 18.30584,44.19418l0,0c0,34.51779 -27.98221,62.5 -62.5,62.5l0,0c-34.51779,0 -62.5,-27.98221 -62.5,-62.5zm31.25,0l0,0c0,17.25889 13.99111,31.25 31.25,31.25c17.2589,0 31.25,-13.99111 31.25,-31.25c0,-17.25889 -13.99111,-31.25 -31.25,-31.25l0,0c-17.25889,0 -31.25,13.99111 -31.25,31.25z"/>
                        <path className="tictactoe-square circleMark" stroke="none" fill="currentColor" id="square_2" onClick={()=>{markSquare(thisGame.user1 === currentUser, 2, true);}} d="m365.32499,94.8975l0,0c0,-34.51779 27.98221,-62.5 62.5,-62.5l0,0c16.57602,0 32.47315,6.5848 44.19417,18.30582c11.72103,11.72103 18.30584,27.61814 18.30584,44.19418l0,0c0,34.51779 -27.98221,62.5 -62.5,62.5l0,0c-34.51779,0 -62.5,-27.98221 -62.5,-62.5zm31.25,0l0,0c0,17.25889 13.99111,31.25 31.25,31.25c17.2589,0 31.25,-13.99111 31.25,-31.25c0,-17.25889 -13.99111,-31.25 -31.25,-31.25l0,0c-17.25889,0 -31.25,13.99111 -31.25,31.25z" />
                        <path className="tictactoe-square circleMark" stroke="none" fill="currentColor" id="square_3" onClick={()=>{markSquare(thisGame.user1 === currentUser, 3, true);}} d="m560.32499,94.8975l0,0c0,-34.51779 27.98221,-62.5 62.5,-62.5l0,0c16.57602,0 32.47315,6.5848 44.19417,18.30582c11.72103,11.72103 18.30584,27.61814 18.30584,44.19418l0,0c0,34.51779 -27.98221,62.5 -62.5,62.5l0,0c-34.51779,0 -62.5,-27.98221 -62.5,-62.5zm31.25,0l0,0c0,17.25889 13.99111,31.25 31.25,31.25c17.2589,0 31.25,-13.99111 31.25,-31.25c0,-17.25889 -13.99111,-31.25 -31.25,-31.25l0,0c-17.25889,0 -31.25,13.99111 -31.25,31.25z" />
                        <path className="tictactoe-square circleMark" stroke="none" fill="currentColor" id="square_4" onClick={()=>{markSquare(thisGame.user1 === currentUser, 4, true);}} d="m170.32499,290.8975l0,0c0,-34.51779 27.98221,-62.5 62.5,-62.5l0,0c16.57602,0 32.47315,6.5848 44.19417,18.30582c11.72103,11.72103 18.30584,27.61814 18.30584,44.19418l0,0c0,34.51779 -27.98221,62.5 -62.5,62.5l0,0c-34.51779,0 -62.5,-27.98221 -62.5,-62.5zm31.25,0l0,0c0,17.25889 13.99111,31.25 31.25,31.25c17.2589,0 31.25,-13.99111 31.25,-31.25c0,-17.25889 -13.99111,-31.25 -31.25,-31.25l0,0c-17.25889,0 -31.25,13.99111 -31.25,31.25z" />
                        <path className="tictactoe-square circleMark" stroke="none" fill="currentColor" id="square_5" onClick={()=>{markSquare(thisGame.user1 === currentUser, 5, true);}} d="m365.32499,290.8975l0,0c0,-34.51779 27.98221,-62.5 62.5,-62.5l0,0c16.57602,0 32.47315,6.5848 44.19417,18.30582c11.72103,11.72103 18.30584,27.61814 18.30584,44.19418l0,0c0,34.51779 -27.98221,62.5 -62.5,62.5l0,0c-34.51779,0 -62.5,-27.98221 -62.5,-62.5zm31.25,0l0,0c0,17.25889 13.99111,31.25 31.25,31.25c17.2589,0 31.25,-13.99111 31.25,-31.25c0,-17.25889 -13.99111,-31.25 -31.25,-31.25l0,0c-17.25889,0 -31.25,13.99111 -31.25,31.25z" />
                        <path className="tictactoe-square circleMark" stroke="none" fill="currentColor" id="square_6" onClick={()=>{markSquare(thisGame.user1 === currentUser, 6, true);}} d="m560.32499,290.8975l0,0c0,-34.51779 27.98221,-62.5 62.5,-62.5l0,0c16.57602,0 32.47315,6.5848 44.19417,18.30582c11.72103,11.72103 18.30584,27.61814 18.30584,44.19418l0,0c0,34.51779 -27.98221,62.5 -62.5,62.5l0,0c-34.51779,0 -62.5,-27.98221 -62.5,-62.5zm31.25,0l0,0c0,17.25889 13.99111,31.25 31.25,31.25c17.2589,0 31.25,-13.99111 31.25,-31.25c0,-17.25889 -13.99111,-31.25 -31.25,-31.25l0,0c-17.25889,0 -31.25,13.99111 -31.25,31.25z" />
                        <path className="tictactoe-square circleMark" stroke="none" fill="currentColor" id="square_7" onClick={()=>{markSquare(thisGame.user1 === currentUser, 7, true);}} d="m170.32499,486.8975l0,0c0,-34.51779 27.98221,-62.5 62.5,-62.5l0,0c16.57602,0 32.47315,6.5848 44.19417,18.30582c11.72103,11.72103 18.30584,27.61814 18.30584,44.19418l0,0c0,34.51779 -27.98221,62.5 -62.5,62.5l0,0c-34.51779,0 -62.5,-27.98221 -62.5,-62.5zm31.25,0l0,0c0,17.25889 13.99111,31.25 31.25,31.25c17.2589,0 31.25,-13.99111 31.25,-31.25c0,-17.25889 -13.99111,-31.25 -31.25,-31.25l0,0c-17.25889,0 -31.25,13.99111 -31.25,31.25z" />
                        <path className="tictactoe-square circleMark" stroke="none" fill="currentColor" id="square_8" onClick={()=>{markSquare(thisGame.user1 === currentUser, 8, true);}} d="m365.32499,486.8975l0,0c0,-34.51779 27.98221,-62.5 62.5,-62.5l0,0c16.57602,0 32.47315,6.5848 44.19417,18.30582c11.72103,11.72103 18.30584,27.61814 18.30584,44.19418l0,0c0,34.51779 -27.98221,62.5 -62.5,62.5l0,0c-34.51779,0 -62.5,-27.98221 -62.5,-62.5zm31.25,0l0,0c0,17.25889 13.99111,31.25 31.25,31.25c17.2589,0 31.25,-13.99111 31.25,-31.25c0,-17.25889 -13.99111,-31.25 -31.25,-31.25l0,0c-17.25889,0 -31.25,13.99111 -31.25,31.25z" />
                        <path className="tictactoe-square circleMark" stroke="none" fill="currentColor" id="square_9" onClick={()=>{markSquare(thisGame.user1 === currentUser, 9, true);}} d="m560.32499,486.8975l0,0c0,-34.51779 27.98221,-62.5 62.5,-62.5l0,0c16.57602,0 32.47315,6.5848 44.19417,18.30582c11.72103,11.72103 18.30584,27.61814 18.30584,44.19418l0,0c0,34.51779 -27.98221,62.5 -62.5,62.5l0,0c-34.51779,0 -62.5,-27.98221 -62.5,-62.5zm31.25,0l0,0c0,17.25889 13.99111,31.25 31.25,31.25c17.2589,0 31.25,-13.99111 31.25,-31.25c0,-17.25889 -13.99111,-31.25 -31.25,-31.25l0,0c-17.25889,0 -31.25,13.99111 -31.25,31.25z" />                
                    </g>
                </svg>  
            </div>
        </ main>
    );
}
