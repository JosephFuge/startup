
function newGame() {
    const opponentUsername = document.getElementById('opponentUsername').value;
    const currentUsername = localStorage.getItem("username");

    saveNewGame(new GameData([
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
    window.location.href = "gameselect.html";
}