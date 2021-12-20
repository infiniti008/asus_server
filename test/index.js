const express = require('express');

const app = express();

app.listen('8070', () => {
    console.log('started at 8070')
});

app.get('/', (req, res) => {
    res.send('sadlas;dlaks;dlaskd;laskd 8070')
});
