/* eslint-disable no-unused-vars */
// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./HomePage.module.css";
import ExchangeWidget from "../components/ExchangeWidget/ExchangeWidget";
import EthAdressField from "../components/EthAdressField/EthAdressField";

const API_KEY =
  "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd";
const API_URL = "https://api.changenow.io/v1";

const HomePage = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("ETH");
  const [amount, setAmount] = useState("");
  const [minAmount, setMinAmount] = useState(null);
  const [estimatedAmount, setEstimatedAmount] = useState(null);
  const [error, setError] = useState(null);

  const getAvailableCurrencies = async () => {
    try {
      const response = await axios.get(`${API_URL}/currencies`, {
        params: { apiKey: API_KEY },
      });
      setCurrencies(response.data.slice(0, 5)); // Берём первые 5 валют
    } catch (error) {
      console.error("Ошибка при загрузке валют:", error);
      setError("Ошибка при загрузке валют");
    }
  };

  const getMinimalExchangeAmount = async (fromCurrency, toCurrency) => {
    try {
      const response = await axios.get(
        `${API_URL}/min-amount/${fromCurrency.toLowerCase()}_${toCurrency.toLowerCase()}?api_key=${API_KEY}`
      );
      setMinAmount(response.data.minAmount);
    } catch (error) {
      console.error("Ошибка при получении минимальной суммы обмена:", error);
      setError("Ошибка при получении минимальной суммы обмена");
    }
  };

  useEffect(() => {
    getAvailableCurrencies();
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      getMinimalExchangeAmount(fromCurrency, toCurrency);
    }
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = async (e) => {
    const value = e.target.value;
    setAmount(value);

    if (value >= minAmount) {
      try {
        const response = await axios.get(
          `${API_URL}/exchange-amount/${value}/${fromCurrency.toLowerCase()}_${toCurrency}?api_key=${API_KEY}`
        );
        setEstimatedAmount(response.data.estimatedAmount);
      } catch (error) {
        console.error("Ошибка при получении ожидаемой суммы обмена:", error);
        setError("Ошибка при получении ожидаемой суммы обмена");
      }
    } else {
      setEstimatedAmount(null);
    }
  };

  const handleCurrencyChange = (newFromCurrency, newToCurrency) => {
    setFromCurrency(newFromCurrency);
    setToCurrency(newToCurrency);
    getMinimalExchangeAmount(newFromCurrency, newToCurrency);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.txt}>
          <h1>Crypto Exchange</h1>
          <p>Exchange fast and easy</p>
        </div>

        <ExchangeWidget
          currencies={currencies}
          minAmount={minAmount}
          onCurrencyChange={handleCurrencyChange}
        />
        <EthAdressField />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default HomePage;
