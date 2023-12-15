import { WebSocketAccess } from './websocketAccess';
import { updateGame, fetchSpecificGame } from '../databaseAccess';

const markedCircles = new Set([]);
const markedCrosses = new Set([]);
let thisGame;
let currentUser = '';
let gameOver = false;
let gameId = localStorage.getItem('currentGameId');
let webSocket = new WebSocketAccess(gameId, markSquare, setUserEmojiReaction);

async function setUpGame(thisGameData) {
    if (gameId) {
        currentUser = localStorage.getItem('username');
        thisGame = thisGameData;

        // document.getElementById('opponentUserName').innerText = currentUser === thisGame.user1 ? thisGame.user2 : thisGame.user1;

        const circlesToMark = new Set([]);
        const crossesToMark = new Set([]);
    
        for (let i = 0; i < thisGame.gameList[0].length; i++) {
            if (thisGame.gameList[0][i] === 'o') {
                circlesToMark.add(i + 1);
            } else if (thisGame.gameList[0][i] === 'x') {
                crossesToMark.add(i + 1);
            }
        }
    
        for (var circle of circlesToMark) {
            markSquare(true, circle, false);
        }
    
        for (var cross of crossesToMark) {
            markSquare(false, cross, false);
        }
    
        if (checkVictory(markedCircles)) {
            gameOver = true;
            document.getElementById('userTurnHeader').innerHTML = thisGame.user1 === currentUser ? 'VICTORY' : 'DEFEAT';
            let ghostMarks = document.querySelectorAll('.tictactoe-square');
    
            // Loop through the NodeList and remove each element
            ghostMarks.forEach(element => {
                element.parentNode.removeChild(element);
            });
        } else if (checkVictory(markedCrosses)) {
            gameOver = true;
            document.getElementById('userTurnHeader').innerHTML = thisGame.user2 === currentUser ? 'VICTORY' : 'DEFEAT';
            let ghostMarks = document.querySelectorAll('.tictactoe-square');
    
            // Loop through the NodeList and remove each element
            ghostMarks.forEach(element => {
                element.parentNode.removeChild(element);
            });
        }
    } else {
        window.location.href = "gameselect.html";
    }
}

window.onbeforeunload = () => webSocket.closeConnection();


function setUserEmojiReaction(emojiIcon) {

    const user2EmojiBubble = document.getElementById("user2Emoji");
    user2EmojiBubble.innerText = emojiIcon;
    user2EmojiBubble.style.display = "inline";

    setTimeout(function(){
        const user2EmojiTempBubble = document.getElementById("user2Emoji");
        user2EmojiTempBubble.innerText = '';
        user2EmojiTempBubble.style.display = 'none';
    }, 5000);
}

function sendEmoji(emojiNum) {
    webSocket.sendEmojiReaction(emojiNum);
}

function getXandY(isCircle, squareNum) {
    const xOffSet = 25;
    const yOffSet = 196;

    let x = 170.32499;
    let y = isCircle ? 94.8975 : 67.0;

    switch(squareNum) {
        case 2:
            x *= 2;
            x += xOffSet;
            break;
        case 3:
            x *= 3;
            x += xOffSet * 2;
            break;
        case 4:
            y += yOffSet;
            break;
        case 5:
            x *= 2;
            x += xOffSet;
            y += yOffSet;
            break;
        case 6:
            x *= 3;
            x += xOffSet * 2;
            y += yOffSet;
            break;
        case 7: 
            y += yOffSet * 2;
            break;
        case 8:
            x *= 2;
            x += xOffSet;
            y += yOffSet * 2;
            break;
        case 9:
            x *= 3;
            x += xOffSet * 2;
            y += yOffSet * 2;
        break;
        default:
            break;
    }

    return x.toString() + ',' + y.toString();
}

function getCirclePath(squareNum) {
    return 'm' + getXandY(true, squareNum) + 'l0,0c0,-34.51779 27.98221,-62.5 62.5,-62.5l0,0c16.57602,0 32.47315,6.5848 44.19417,18.30582c11.72103,11.72103 18.30584,27.61814 18.30584,44.19418l0,0c0,34.51779 -27.98221,62.5 -62.5,62.5l0,0c-34.51779,0 -62.5,-27.98221 -62.5,-62.5zm31.25,0l0,0c0,17.25889 13.99111,31.25 31.25,31.25c17.2589,0 31.25,-13.99111 31.25,-31.25c0,-17.25889 -13.99111,-31.25 -31.25,-31.25l0,0c-17.25889,0 -31.25,13.99111 -31.25,31.25z';
}

function getCrossPath(squareNum) {
    return 'm' + getXandY(false, squareNum) + 'l31.27592,-31.27592l33.22392,33.22365l33.22392,-33.22365l31.27621,31.27592l-33.22393,33.22392l33.22393,33.22392l-31.27621,31.27621l-33.22392,-33.22393l-33.22392,33.22393l-31.27592,-31.27621l33.22365,-33.22392l-33.22365,-33.22392z';
}

function markSquare(fillCircle, squareNum, updateServer, isFromOtherPlayer) {
    if (!updateServer || (fillCircle && thisGame.turn === 1) || (!fillCircle && thisGame.turn === 2)) {
        const square = document.getElementById('square_' + squareNum);
        let newMark = document.createElementNS("http://www.w3.org/2000/svg", "path");
        newMark.setAttribute('stroke', '#000');
        if (fillCircle) {
            newMark.setAttribute('d', getCirclePath(squareNum));
            markedCircles.add(squareNum);
            newMark.setAttribute('fill', '#007fff');
        } else {
            newMark.setAttribute('d', getCrossPath(squareNum));
            markedCrosses.add(squareNum);
            newMark.setAttribute('fill', '#ff5555');
        }
    
        square.parentNode.replaceChild(newMark, square);
    
        if (updateServer) {
            const gameId = localStorage.getItem('currentGameId');
            updateGame(gameId, thisGame.user1 === currentUser ? 'o' : 'x', {layer1: squareNum, layer2: -1});

            webSocket.sendGameMove(fillCircle, squareNum, -1);
    
            if (!checkVictory(thisGame.user1 === currentUser ? markedCircles : markedCrosses)) {
                thisGame.turn = thisGame.turn === 1 ? 2 : 1;
                
                for (let i = 1; i <= 9; i++) {
                    if (!markedCircles.has(i) && !markedCrosses.has(i)) {
                        let ghostMark = document.getElementById("square_" + i.toString());
                        ghostMark.setAttribute('d', thisGame.user1 === currentUser ? getCirclePath(i) : getCrossPath(i));
                        ghostMark.setAttribute('class', thisGame.user1 === currentUser ? 'tictactoe-square circleMark' : 'tictactoe-square crossMark');
                    }
                }
            } else {
                gameOver = true;
                document.getElementById('userTurnHeader').innerHTML = 'VICTORY';
                let ghostMarks = document.querySelectorAll('.tictactoe-square');
        
                // Loop through the NodeList and remove each element
                ghostMarks.forEach(element => {
                    element.parentNode.removeChild(element);
                });
            }
        } else if (isFromOtherPlayer) {
            if (!checkVictory(thisGame.user2 === currentUser ? markedCircles : markedCrosses)) {
                thisGame.turn = thisGame.turn === 1 ? 2 : 1;
                
                for (let i = 1; i <= 9; i++) {
                    if (!markedCircles.has(i) && !markedCrosses.has(i)) {
                        let ghostMark = document.getElementById("square_" + i.toString());
                        ghostMark.setAttribute('d', thisGame.user1 === currentUser ? getCirclePath(i) : getCrossPath(i));
                        ghostMark.setAttribute('class', thisGame.user1 === currentUser ? 'tictactoe-square circleMark' : 'tictactoe-square crossMark');
                    }
                }
            } else {
                gameOver = true;
                document.getElementById('userTurnHeader').innerHTML = 'DEFEAT';
                let ghostMarks = document.querySelectorAll('.tictactoe-square');
        
                // Loop through the NodeList and remove each element
                ghostMarks.forEach(element => {
                    element.parentNode.removeChild(element);
                });
            }
        } else {
            for (let i = 1; i <= 9; i++) {
                if (!markedCircles.has(i) && !markedCrosses.has(i)) {
                    let ghostMark = document.getElementById("square_" + i.toString());
                    ghostMark.setAttribute('d', thisGame.user1 === currentUser ? getCirclePath(i) : getCrossPath(i));
                    ghostMark.setAttribute('class', thisGame.user1 === currentUser ? 'tictactoe-square circleMark' : 'tictactoe-square crossMark');
                }
            }
        }
    }    
    if (!gameOver) {
        if ((thisGame.turn === 1 && thisGame.user1 === currentUser) || (thisGame.turn === 2 && thisGame.user2 === currentUser)) {
            document.getElementById('userTurnHeader').innerHTML = 'Your Turn';
        } else {
            document.getElementById('userTurnHeader').innerHTML = 'Opponent\'s Turn';
        }
    }
}

function checkVictory(marks) {
    let marksValues = Array.from(marks);
    if ([1, 2 ,3].every((value) => marksValues.includes(value))) {
        setRow(1);
        return true;
    } else if ([4,5,6].every((value) => marksValues.includes(value))) {
        setRow(2);
        return true;
    } else if ([7,8,9].every((value) => marksValues.includes(value))) {
        setRow(3);
        return true;
    } else if ([1,4,7].every((value) => marksValues.includes(value))) {
        setCol(1);
        return true;
    } else if ([2,5,8].every((value) => marksValues.includes(value))) {
        setCol(2);
        return true;
    } else if ([3,6,9].every((value) => marksValues.includes(value))) {
        setCol(3);
        return true;
    } else if ([1,5,9].every((value) => marksValues.includes(value))) {
        setDiagonal(true);
        return true;
    } else if ([3,5,7].every((value) => marksValues.includes(value))) {
        setDiagonal(false);
        return true;
    }
    return false;
}

function setRow(rowNum) {
    // Set default bar attributes
    let victoryRow = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    victoryRow.setAttribute('transform', 'rotate(-90 422.5 184)');
    setDefaultBarAttributes(victoryRow);
    victoryRow.setAttribute('y', '-87');

    // Change position based on which row it is
    victoryRow.setAttribute('x', 500 - ((rowNum - 1) * 200));

    // Add row to so it appears on tap of all other marks and bars
    document.getElementById('marksGroup').appendChild(victoryRow);
}

function setCol(colNum) {
    // Set default bar attributes
    let victoryCol = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    setDefaultBarAttributes(victoryCol);
    victoryCol.setAttribute('y', '18');

    // Change position based on which column it is
    victoryCol.setAttribute('x', 220 + ((colNum - 1) * 196));

    // Add column to so it appears on tap of all other marks and bars
    document.getElementById('marksGroup').appendChild(victoryCol);
}

function setDiagonal(topLeftToBotRight) {
    let victoryDiag = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    setDefaultBarAttributes(victoryDiag);
    victoryDiag.setAttribute('height', '660');

    if (topLeftToBotRight) {
        // topLeftToBotRight:
    // <rect transform="rotate(-45 422.5 184)" id="svg_3" height="660" width="37" y="-60" x="335" stroke="#000" fill="currentColor"/>
        victoryDiag.setAttribute('transform', 'rotate(-45 422.5 184)');
        victoryDiag.setAttribute('y', '-60');
        victoryDiag.setAttribute('x', '335');
    } else {
        // botLeftToTopRight: 
        // <rect transform="rotate(45 422.5 184)" id="svg_3" height="660" width="37" y="-75" x="490" stroke="#000" fill="currentColor"/>
        victoryDiag.setAttribute('transform', 'rotate(45 422.5 184)');
        victoryDiag.setAttribute('y', '-75');
        victoryDiag.setAttribute('x', '490');
    }

    // Add diagonal to so it appears on tap of all other marks and bars
    document.getElementById('marksGroup').appendChild(victoryDiag);
}

function setDefaultBarAttributes(barElement) {
    barElement.setAttribute('id', 'victory_bar');
    barElement.setAttribute('stroke', "#000");
    barElement.setAttribute('fill', 'currentColor');
    barElement.setAttribute('height', '550');
    barElement.setAttribute('width', '25');
}

export { setUpGame, markSquare, sendEmoji };