const TicTacToeMove = 'gameMove';
const EmojiReaction = 'emojiReaction';
class WebSocketAccess {
    #socket;
    gameId;
    markSquare;

    constructor(socketGameId, markSquareCallback) {
        this.gameId = socketGameId;

        this.#configureWebSocket();
        this.markSquare = markSquareCallback;
    }

    closeConnection() {
        if (this.#socket && this.#socket.readyState === WebSocket.OPEN) {
            this.#socket.close();
        }
    }

    #configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.#socket = new WebSocket(`${protocol}://${window.location.host}/ws?gameId=${gameId}`);
        this.#socket.onopen = (event) => {
            console.log(`Connection opened for game ${gameId}`);
        };
        this.#socket.onclose = (event) => {
            console.log(`Connection closed for game ${gameId}`);
        };
        this.#socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            if (msg.type === TicTacToeMove) {
                console.log(`TicTacToe Move Received - mark: ${msg.mark} layer1: ${msg.position['layer1']} layer2: ${msg.position['layer2']}`);
                this.markSquare(msg.isCircle, msg.position['layer1'], false, true);
            } else if (msg.type === EmojiReaction) {
                console.log(`Emoji Reaction Received ${msg.emojiNum}`);
            }
        };
    }

    getEmojiReaction() {
        // TODO: Convert to pulling emoji data from WebSocket connection
        // const laughEmoji = '😂';
        const sadEmoji = '😢';
    
        return sadEmoji;
    }
    
    sendEmojiReaction(emojiNum) {
        const emojiMsg = {
            type: EmojiReaction,
            emojiNum: emojiNum,
          };
          this.#socket.send(JSON.stringify(emojiMsg));
    }

    sendGameMove(isCircle, layer1, layer2) {
        const move = {
            isCircle: isCircle,
            type: TicTacToeMove,
            position: {layer1: layer1, layer2: layer2},
          };
          this.#socket.send(JSON.stringify(move));
    }
}