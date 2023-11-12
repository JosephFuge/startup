const PORT_NUM = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express');
const app = express();

// JSON parsing middleware
app.use(express.json());

// Frontend static middleware
app.use(express.static('public'));

// API listener middleware
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Send games for a particular user
apiRouter.post('/fetchGames', (req, res) => {

});

// Update a game with new moves
apiRouter.post('/updateGame', (req, res) => {});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Send data for specific game
apiRouter.post('/fetchGame', (req, res) => {

});

app.listen(PORT_NUM, () => console.log(`Server is listening on port ${PORT_NUM}`));