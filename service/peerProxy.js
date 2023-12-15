import { WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const gameId = url.searchParams.get('gameId');
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request, gameId);
    });
  });

  // Keep track of all the connections organized by game so we can forward messages to the right players
  let games = {};

  wss.on('connection', (ws, request, gameId) => {
    if (!games[gameId]) {
        games[gameId] = [];
    }
    const connection = { id: uuid(), alive: true, ws: ws };
    games[gameId].push(connection);

    // Forward messages to the other player in the game
    ws.on('message', function message(data) {
      games[gameId].forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
        games[gameId] = games[gameId].filter(c => c.id !== connection.id);
        if (games[gameId].length === 0) {
          delete games[gameId];
        }
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    Object.values(games).forEach((game) => {
      // Kill any connection that didn't respond to the ping last time
      game.forEach((c) => {
        if (!c.alive) {
            c.ws.terminate();
          } else {
            c.alive = false;
            c.ws.ping();
          }
      });
    });
  }, 10000);
}

export { peerProxy };