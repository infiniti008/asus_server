const express = require('express');

const app = express();

app.listen('5555', () => {
    console.log('started at 5555')
});

app.get('/', (req, res) => {
    res.send('s5555')
});
