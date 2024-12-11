import React, { useState, useEffect } from "react";
import { TextField, FormControl, Select, MenuItem, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import {
  getAvailableCurrencies,
  getMinimalExchangeAmount,
  fetchEstimatedAmount,
} from "../../services/apiService";
import styles from "./ExchangeWidget.module.css";

// eslint-disable-next-line react/prop-types
const ExchangeWidget = ({ setError }) => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState("");
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("");
  const [amount, setAmount] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState(null);
  const [error, setErrorWidget] = useState(null);
  const [minimalAmount, setMinimalAmount] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await getAvailableCurrencies();
        setCurrencies(data);
      } catch (error) {
        setErrorWidget(error.message);
        setError(error.message);
      }
    };
    loadCurrencies();
  }, []);

  useEffect(() => {
    if (currencies.length > 0) {
      setSelectedCurrencyFrom(currencies[0].ticker);
      setSelectedCurrencyTo(currencies[1].ticker);
    }
  }, [currencies]);

  useEffect(() => {
    if (selectedCurrencyFrom && selectedCurrencyTo) {
      const loadAmounts = async () => {
        try {
          const minimalExchangeAmount = await getMinimalExchangeAmount(
            selectedCurrencyFrom,
            selectedCurrencyTo
          );
          setMinimalAmount(minimalExchangeAmount);
          setAmount(minimalExchangeAmount);
          const estimated = await fetchEstimatedAmount(
            minimalExchangeAmount,
            selectedCurrencyFrom,
            selectedCurrencyTo
          );
          setEstimatedAmount(estimated);
        } catch (error) {
          setErrorWidget(error.message);
          setError(error.message);
        }
      };

      loadAmounts();
    }
  }, [selectedCurrencyFrom, selectedCurrencyTo]);

  const handleAmountChange = (value) => {
    if (value < minimalAmount) {
      setErrorWidget(
        `Сумма не может быть меньше минимальной: ${minimalAmount}`
      );
      setError(`Сумма не может быть меньше минимальной: ${minimalAmount}`);
      return;
    }

    setAmount(value);
    setErrorWidget(null);
    setError(null);
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(async () => {
      try {
        const estimated = await fetchEstimatedAmount(
          value,
          selectedCurrencyFrom,
          selectedCurrencyTo
        );
        setEstimatedAmount(estimated);
      } catch (error) {
        setErrorWidget(error.message);
        setError(error.message);
      }
    }, 500);

    setTimer(newTimer);
  };

  const handleSwapCurrencies = () => {
    setErrorWidget(null);
    setError(null);
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setSelectedCurrencyTo(selectedCurrencyFrom);
    setMinimalAmount(0);
    setEstimatedAmount(null);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftCript}>
            <TextField
              required
              value={amount || ""}
              onChange={(e) => handleAmountChange(e.target.value)}
              variant="outlined"
              className={styles.txtField}
              sx={{
                minWidth: 300,
                maxWidth: 400,
                width: "100%",
                margin: 0,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
                  fontSize: "16px",
                },
              }}
            />
            <FormControl sx={{ minWidth: 150, maxWidth: 150, margin: 0 }}>
              <Select
                value={selectedCurrencyFrom}
                onChange={(e) => {
                  const newFromCurrency = e.target.value;
                  setSelectedCurrencyFrom(newFromCurrency);
                }}
                sx={{
                  height: 40,
                  borderRadius: 5,
                  fontSize: "16px",
                }}
                IconComponent={KeyboardArrowDownIcon}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.ticker} value={currency.ticker}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={currency.image}
                        alt={`${currency.ticker} icon`}
                        style={{ width: 20, height: 20, marginRight: 8 }}
                      />
                      {currency.ticker}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className={styles.icon}>
          <SwapHorizIcon
            sx={{ fontSize: 32, color: "#007bff", cursor: "pointer" }}
            onClick={handleSwapCurrencies}
          />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.rightCript}>
            <TextField
              required
              value={estimatedAmount || ""}
              variant="outlined"
              className={styles.txtField}
              sx={{
                minWidth: 300,
                maxWidth: 400,
                margin: 0,
                backgroundColor: "#f9f9f9",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  fontSize: "16px",
                },
              }}
            />
            <FormControl sx={{ minWidth: 150, maxWidth: 150, margin: 0 }}>
              <Select
                value={selectedCurrencyTo || ""}
                onChange={(e) => {
                  const newToCurrency = e.target.value;
                  setSelectedCurrencyTo(newToCurrency);
                }}
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  height: 40,
                  backgroundColor: "#f9f9f9",
                  borderRadius: 4,
                }}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.ticker} value={currency.ticker}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={currency.image}
                        alt={`${currency.ticker} icon`}
                        style={{ width: 20, height: 20, marginRight: 8 }}
                      />
                      {currency.ticker}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default ExchangeWidget;
