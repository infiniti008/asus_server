const express = require('express');

const app = express();

app.listen('4444', () => {
    console.log('started at 4444')
});

app.get('/', (req, res) => {
    res.send('sadlas;dlaks;dlaskd;laskd')
});
