// @ts-nocheck
import React, { useEffect } from "react";
import { useState } from "react";
import CurrencyRow from "./CurrencyRow.js";
import { api_key } from "./api_key.js";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [rate, setRate] = useState();
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  // const [fromAmount, setFromAmount] = useState();
  // const [toAmount, setToAmount] = useState();

  const [amount, setAmount] = useState(1);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    console.log("test");
    fromAmount = amount;
    toAmount = amount * rate;
  } else {
    console.log("test2");
    fromAmount = amount / rate;
    toAmount = amount;
  }

  useEffect(() => {
    fetch("http://localhost:8000")
      .then((response) => response.json())
      .then((result) => {
        let firstCurrency = Object.keys(result.rates)[0];
        setFromCurrency(result.base);
        setToCurrency(firstCurrency);
        setCurrencyOptions([result.base, ...Object.keys(result.rates)]);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `http://localhost:8000/specific?` +
          new URLSearchParams({
            to_currency: toCurrency,
            from_currency: fromCurrency,
          })
      )
        .then((response) => response.json())
        .then((result) => {
          setRate(result.rates[toCurrency]);
        })
        .catch((error) => console.log("error", error));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  return (
    <div className="App">
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => {
          setFromCurrency(e.target.value);
        }}
        amount={fromAmount}
        handleChange={handleFromChange}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => {
          setToCurrency(e.target.value);
        }}
        amount={toAmount}
        handleChange={handleToChange}
      />
    </div>
  );
}

export default App;
