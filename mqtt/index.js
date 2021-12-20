const express = require('express');

const app = express();

app.listen('8071', () => {
    console.log('started at 8071')
});

app.get('/', (req, res) => {
    res.send('8071')
});
