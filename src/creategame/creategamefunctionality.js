import { saveNewGame } from '../databaseAccess';
import { GameData } from '../models';

function newGame() {
    const opponentUsername = document.getElementById('opponentUsername').value;
    const currentUsername = localStorage.getItem("username");

    saveNewGame(new GameData(0, [
        ['', '', '', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '']], currentUsername, opponentUsername, 0)).then((_) => {
            setTimeout(()=> {window.location.href = "/gameselect";});
        }).catch();

    // document.getElementById('recursionLayersSelect');
    // TODO: Add a second layer
    
}

export { newGame };