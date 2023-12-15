import React from 'react';

import './creategame.css';
import { newGame } from './creategamefunctionality.js';

export function CreateGame(){
    
    return (
        <>
            <div className="create-body">
                <h2 className="page-title">Create New Game</h2>
                <form id="newGameForm">
                    <input type="text" className="text-field" id="opponentUsername" placeholder="Opponent Username" />
                    <p>How many additional layers of recursion do you want?</p>
                    <select className="rounded-button" id="recursionLayersSelect">
                        <option>1 layer</option>
                    </select>
                    <br />
                    <input className="rounded-button" type="button" id="createButton" onClick={()=>{newGame();}} value="Send Game Request" />
                </form>
            </div>
        
        </>
    );
}