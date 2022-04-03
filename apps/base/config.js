export default {
  PORT: 8070,
  "baseName": "alfabot-40432-default-rtdb",
  "baseHost": "https://alfabot-40432-default-rtdb.europe-west1.firebasedatabase.app/",
  "basePath": "export/database_export/alfabot-40432-default-rtdb.json",
  "baseSaveInterval": 5,
  "keysToSubscribe": [
    "kurs-usd-alfa-a",
    "kurs-usd-alfa-sell",
    "kurs-usd-alfa-buy",
    "kurs-eur-alfa-sell",
    "kurs-eur-alfa-buy",
    "kurs-usd-nbrb-tomorrow",
    "kurs-usd-nbrb",
    "kurs-eur-nbrb"
  ],
  "keyNameMapping": {
    "kurs-usd-alfa-a": "USD | Альфа банк | А Курс",
    "kurs-usd-alfa-sell": "USD | Альфа банк | Продажа",
    "kurs-usd-alfa-buy": "USD | Альфа банк | Покупка",
    "kurs-eur-alfa-sell": "EUR | Альфа банк | Продажа",
    "kurs-eur-alfa-buy": "EUR | Альфа банк | Покупка",
    "kurs-usd-nbrb-tomorrow": "USD | БВФБ | Торги",
    "kurs-usd-nbrb": "USD | БВФБ | НБРБ",
    "kurs-eur-nbrb": "EUR | БВФБ | НБРБ"
  }
}