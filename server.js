import express from "express";
const app = express();
import cors from "cors";
import axios from "axios";
import fetch, { Headers } from "node-fetch";

if (!globalThis.fetch) {
  // @ts-ignore
  globalThis.fetch = fetch;
  // @ts-ignore
  globalThis.Headers = Headers;
}

import dotenv from "dotenv";
dotenv.config();
app.use(cors());

app.get("/", (req, res) => {
  global.fetch = fetch;
  global.Headers = fetch.Headers;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      apikey: process.env.API_KEY,
    },
  };

  // @ts-ignore
  fetch(
    "https://api.apilayer.com/exchangerates_data/latest?symbols=&base=",
    // @ts-ignore
    requestOptions
  )
    .then((response) => response.text())
    .then((response) => JSON.parse(response))
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log("error", error));
});

app.get("/specific", (req, res) => {
  const toCurrency = req.query.to_currency;
  const fromCurrency = req.query.from_currency;

  console.log(toCurrency);
  console.log(fromCurrency);

  global.fetch = fetch;
  global.Headers = fetch.Headers;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      apikey: process.env.API_KEY,
    },
  };

  // @ts-ignore
  fetch(
    // `https://api.apilayer.com/exchangerates_data/latest?symbols=${toCurrency}base=${fromCurrency}`,
    `https://api.apilayer.com/exchangerates_data/latest?symbols=${toCurrency}&base=${fromCurrency}`,

    // @ts-ignore
    requestOptions
  )
    .then((response) => response.text())
    .then((response) => JSON.parse(response))
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log("error", error));
});

app.listen(8000, () => {
  console.log("server running");
});
