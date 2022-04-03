import BaseData from './baseData.js';
import express from 'express';
import CONFIG from'./config.js';

const baseData = new BaseData(CONFIG);
const app = express();

app.listen(CONFIG.PORT, () => {
  console.log('Base service started at PORT:', CONFIG.PORT);
});

app.get('/set-kurs-by-key', (req, res) => {
  res.send('OK');
  if(req.query?.key) {
    baseData.setKursByKey(req.query?.key, req.query?.value);
  }
});