
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
        ['', '', '', '', '', '', '', '', '']], currentUsername, opponentUsername, 0));

    // document.getElementById('recursionLayersSelect');
    // TODO: Add a second layer
    window.location.href = "/gameselect";
}