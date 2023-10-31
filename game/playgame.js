
function setUserEmojiReaction() {
    const reaction = getEmojiReaction();

    const user2EmojiBubble = document.getElementById("user2Emoji");
    user2EmojiBubble.innerHTML = reaction;
    user2EmojiBubble.style.display = "inline";
}

function markSquare(fillCircle, squareId) {
    const square = document.getElementById(squareId);
    let newMark = document.createElement("path");
    newMark.getAttribute('d') = "m170.32499,94.8975l0,0c0,-34.51779 27.98221,-62.5 62.5,-62.5l0,0c16.57602,0 32.47315,6.5848 44.19417,18.30582c11.72103,11.72103 18.30584,27.61814 18.30584,44.19418l0,0c0,34.51779 -27.98221,62.5 -62.5,62.5l0,0c-34.51779,0 -62.5,-27.98221 -62.5,-62.5zm31.25,0l0,0c0,17.25889 13.99111,31.25 31.25,31.25c17.2589,0 31.25,-13.99111 31.25,-31.25c0,-17.25889 -13.99111,-31.25 -31.25,-31.25l0,0c-17.25889,0 -31.25,13.99111 -31.25,31.25z";
    newMark.getAttribute('stroke') = "#000";
    newMark.getAttribute('fill') = "#0000FF";
    if (fillCircle) {
        square.parentNode.replaceChild(newMark, square);
    }
}