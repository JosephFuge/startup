
function setUserEmojiReaction() {
    const reaction = getEmojiReaction();

    const user2EmojiBubble = document.getElementById("user2Emoji");
    user2EmojiBubble.innerHTML = reaction;
    user2EmojiBubble.style.display = "inline";
}