import rp from 'request-promise';
import cheerio from 'cheerio';
import sendKursByKey from '../api.js';
import getDescendantProp from '../utils.js';

function get_alfa(str) {
  const $ = cheerio.load(str);

  var map = {};
  var headers = [
    {
      key: 'A_KURS',
      title: 'по услуге A-Курс на',
      selectors: [
        {
          key: 'a-kurs-buy',
          sel: 'currenciesData.0.value.exchangeRate.0.purchase.value'
        },
        {
          key: 'a-kurs-sell',
          sel: 'currenciesData.0.value.exchangeRate.0.sell.value'
        }
      ]
    },
    {
      key: 'INSYNC',
      title: 'Курсы валют в Альфа-Клик и InSync',
      selectors: [
        {
          key: 'usd-buy',
          sel: 'currenciesData.0.value.exchangeRate.0.purchase.value'
        },
        {
          key: 'usd-sell',
          sel: 'currenciesData.0.value.exchangeRate.0.sell.value'
        },

        {
          key: 'eur-buy',
          sel: 'currenciesData.0.value.exchangeRate.1.purchase.value'
        },
        {
          key: 'eur-sell',
          sel: 'currenciesData.0.value.exchangeRate.1.sell.value'
        },

        {
          key: 'rub-buy',
          sel: 'currenciesData.0.value.exchangeRate.2.purchase.value'
        },
        {
          key: 'rub-sell',
          sel: 'currenciesData.0.value.exchangeRate.2.sell.value'
        }
      ]
    }
  ];

  let data = $('section div[data-component="ExchangePage"]').attr('data-initial');
  try {
    data = JSON.parse(data);
  }
  catch (e) {
    console.log("[ALFA] - [ERROR]: Error to parse Alfa Bank Data");
  }

  data.initialItems.forEach(initialItem => {
    const header = initialItem.title;
    headers.forEach((lokkedHeader) => {
      if (header.match(lokkedHeader.title) && !map[lokkedHeader.key]) {
        map[lokkedHeader.key] = {};
        lokkedHeader.selectors.forEach((selector) => {
          map[lokkedHeader.key][selector.key] = getDescendantProp(initialItem, selector.sel);
        });
      }
    });
  });

  if (map.A_KURS && map.A_KURS['a-kurs-buy']) {
    sendKursByKey({key: 'usd/alfa-bank-digital/a-kurs', value: map.A_KURS['a-kurs-buy']});
  }

  if (map.INSYNC && map.INSYNC['usd-buy']) {
    sendKursByKey({key: 'usd/alfa-bank-digital/buy', value: map.INSYNC['usd-buy']});
  }

  if (map.INSYNC && map.INSYNC['usd-sell']) {
    sendKursByKey({key: 'usd/alfa-bank-digital/sell', value: map.INSYNC['usd-sell']});
  }

  if (map.INSYNC && map.INSYNC['eur-buy']) {
    sendKursByKey({key: 'eur/alfa-bank-digital/buy', value: map.INSYNC['eur-buy']});
  }

  if (map.INSYNC && map.INSYNC['eur-sell']) {
    sendKursByKey({key: 'eur/alfa-bank-digital/sell', value: map.INSYNC['eur-sell']});
  }

  if (map.INSYNC && map.INSYNC['rub-sell']) {
    sendKursByKey({key: 'rub/alfa-bank-digital/sell', value: map.INSYNC['rub-sell']});
  }

  if (map.INSYNC && map.INSYNC['rub-buy']) {
    sendKursByKey({key: 'rub/alfa-bank-digital/buy', value: map.INSYNC['rub-buy']});
  }
}

function get_alfa_nbrb(str) {
  const $ = cheerio.load(str);

  var map = {};
  var headers = [
    {
      key: 'NBRB',
      title: 'Курсы НБРБ на',
      selectors: [
        {
          key: 'kurs-usd-nbrb',
          sel: 'currenciesData.0.value.exchangeRate.0.purchase.value'
        },
        {
          key: 'kurs-eur-nbrb',
          sel: 'currenciesData.0.value.exchangeRate.1.purchase.value'
        },
        {
          key: 'kurs-rub-nbrb',
          sel: 'currenciesData.0.value.exchangeRate.2.purchase.value'
        }
      ]
    }
  ];

  let data = $('section div[data-component="ExchangePage"]').attr('data-initial');
  try {
    data = JSON.parse(data);
  }
  catch (e) {
    console.log("[ALFA] - [ERROR]: Error to parse Alfa Bank Data");
  }
  
  data.initialItems.forEach(initialItem => {
    const header = initialItem.title;
    headers.forEach((lokkedHeader) => {
      if (header && header.match(lokkedHeader.title) && !map[lokkedHeader.key]) {
        map[lokkedHeader.key] = {};
        lokkedHeader.selectors.forEach((selector) => {
          map[lokkedHeader.key][selector.key] = getDescendantProp(initialItem, selector.sel);
        });
      }
    });
  });

  if (map.NBRB && map.NBRB['kurs-usd-nbrb']) {
    sendKursByKey({key: 'usd/nbrb/current', value: map.NBRB['kurs-usd-nbrb']});
  }

  if (map.NBRB && map.NBRB['kurs-eur-nbrb']) {
    sendKursByKey({key: 'eur/nbrb/current', value: map.NBRB['kurs-eur-nbrb']});
  }

  if (map.NBRB && map.NBRB['kurs-rub-nbrb']) {
    sendKursByKey({key: 'rub/nbrb/current', value: map.NBRB['kurs-rub-nbrb']});
  }
}

function get_nbrb_live(str) {
  const $ = cheerio.load(str);

  let nbrb_live = $('.currency-exchange-block').find('a[href="/currency-exchange/usd"]').parent().next('.currency-exchange-value').text();

  console.log(nbrb_live)
  if (nbrb_live) {
    sendKursByKey({key: 'usd/nbrb/live', value: nbrb_live.trim()});
  }
}

function updateCurrency() {

  rp({ url: 'https://www.alfabank.by/exchange/digital/', strictSSL: false })
    .then(function (alfabankDigital) {
      get_alfa(alfabankDigital);

      console.log("[ALFA] - [UPDATED]: " + new Date().toLocaleString());
    })
    .catch(function (err) {
      console.log("[ALFA] - [ERROR]: " + err);
    });

  rp({ url: 'https://www.alfabank.by/exchange/nbrb/', strictSSL: false })
    .then(function (alfabankNBRB) {
      get_alfa_nbrb(alfabankNBRB);

      console.log("[ALFA_NBRB] - [UPDATED]: " + new Date().toLocaleString());
    })
    .catch(function (err) {
      console.log("[ALFA_NBRB] - [ERROR]: " + err);
    });

  rp({ url: 'https://converter.by/currency-exchange', strictSSL: false })
    .then(function (converter) {
      get_nbrb_live(converter);

      console.log("[CONVERTER] - [UPDATED]: " + new Date().toLocaleString());
    })
    .catch(function (err) {
      console.log("[CONVERTER] - [ERROR]: " + err);
    });
}

const alfa = function (CONFIG) {
  updateCurrency();
  setInterval(updateCurrency, CONFIG.CURRENCY_UPDATE_INTERVAL_MINUTES * 1000 * 60);
}

export default alfa;
