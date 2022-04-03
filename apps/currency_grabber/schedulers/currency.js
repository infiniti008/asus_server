import rp from 'request-promise';
import { getDescendantProp } from '../../../utils.js';
import sendKursByKey from '../api.js';

function updateCurrency() {

  Promise.all([
    rp.post({
      uri: "https://www.sber-bank.by/SBOLServer/rest/currency/rates",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: {
        "type": "CARD",
        "idBranch": null,
        "getBranchList": false
      },
      method: "POST",
      json: true,
      strictSSL: false
    }),
    // rp.post({
    //   uri: "https://www.sber-bank.by/SBOLServer/rest/currency/rates",
    //   headers: {
    //     "Content-Type": "application/json;charset=UTF-8"
    //   },
    //   body: {
    //     "type": "NBRB",
    //     "idBranch": null,
    //     "getBranchList": false
    //   },
    //   method: "POST",
    //   json: true,
    //   strictSSL: false
    // })
  ])
    .then(function ([
      CARD,
      // NBRB
    ]) {
      let currencies = {
        d: new Date().toLocaleString(),
        y: {},
        t: {}
      };

      CARD.rates.list.map((rate) => {
        currencies.t[rate.iso.toLowerCase()] = {
          buy: rate.buy.toFixed(4),
          sell: rate.sale.toFixed(4),
          diffSale: rate.deltaSale,
          diffBuy: rate.deltaBuy
        }
      });

      // NBRB.rates.list.map((rate) => {
      //   if (currencies.t[rate.iso.toLowerCase()]) {
      //     currencies.t[rate.iso.toLowerCase()].nbrb = rate.rate.toFixed(4);
      //     currencies.t[rate.iso.toLowerCase()].nbrbDiff = rate.deltaRate;
      //   }
      // });

      const keys = [
        't.usd.buy',
        't.usd.sell',
        't.eur.buy',
        't.eur.sell',
        't.rub.buy',
        't.rub.sell',
      ];

      const keyBaseMapping = {
        't.usd.buy': 'usd/sber-bank-digital/buy',
        't.usd.sell': 'usd/sber-bank-digital/sell',
        't.eur.buy': 'eur/sber-bank-digital/buy',
        't.eur.sell': 'eur/sber-bank-digital/sell',
        't.rub.buy': 'rub/sber-bank-digital/buy',
        't.rub.sell': 'rub/sber-bank-digital/sell'
      };

      keys.forEach(key => {
        const val = getDescendantProp(currencies, key);

        if(val) {
          sendKursByKey({key: keyBaseMapping[key], value: val});
        }
      });

      console.log("[CURRENCY_V2] - [UPDATED]: " + new Date().toLocaleString());
    })
    .catch(function (err) {
      console.log(err)
      console.log("[CURRENCY_V2] - [ERROR]: " + err);
    });
}

const currency = function (CONFIG) {
  updateCurrency();
  setInterval(updateCurrency, CONFIG.CURRENCY_UPDATE_INTERVAL_MINUTES * 1000 * 60);
}

export default currency;