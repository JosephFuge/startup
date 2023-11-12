const PORT_NUM = 4000;

const express = require('express');
const app = express();



app.use(express.static('public'));


app.listen(PORT_NUM, () => console.log(`Server is listening on port ${PORT_NUM}`));