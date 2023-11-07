const markedCircles = new Set([1, 6]);
const markedCrosses = new Set([7, 9]);
let circleTurn = true;

function setUpGame() {
    for (var circle of markedCircles) {
        markSquare(true, circle);
    }

    for (var cross of markedCrosses) {
        markSquare(false, cross);
    }
}


function setUserEmojiReaction() {
    const reaction = getEmojiReaction();

    const user2EmojiBubble = document.getElementById("user2Emoji");
    user2EmojiBubble.innerHTML = reaction;
    user2EmojiBubble.style.display = "inline";
}

function getXandY(isCircle, squareNum) {
    let x = 170.32499;
    let y = isCircle ? 94.8975 : 67.0;

    switch(squareNum) {
        case 2:
            x *= 2;
            x += 25;
            break;
        case 3:
            x *= 3;
            x += 50;
            break;
        case 4:
            y += 196;
            break;
        case 5:
            x *= 2;
            x += 25;
            y += 196;
            break;
        case 6:
            x *= 3;
            x += 50;
            y += 196;
            break;
        case 7: 
            y += 196 * 2;
            break;
        case 8:
            x *= 2;
            x += 25;
            y += 196 * 2;
            break;
        case 9:
            x *= 3;
            x += 50;
            y += 196 * 2;
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

function markSquare(fillCircle, squareNum) {
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
    circleTurn = !circleTurn;
}