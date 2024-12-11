/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { FormControl, Select, TextField, Box, MenuItem } from "@mui/material";
import styles from "./ExchangeWidget.module.css";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ExchangeWidget = ({ currencies, minAmount, onCurrencyChange }) => {
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState("");
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("");

  useEffect(() => {
    if (currencies.length > 1) {
      setSelectedCurrencyFrom(currencies[0].ticker);
      setSelectedCurrencyTo(currencies[1].ticker);
    }
  }, [currencies]);

  const handleCurrencyFromChange = (event) => {
    const newCurrency = event.target.value;
    setSelectedCurrencyFrom(newCurrency);
    onCurrencyChange(newCurrency, selectedCurrencyTo);
  };

  const handleCurrencyToChange = (event) => {
    const newCurrency = event.target.value;
    setSelectedCurrencyTo(newCurrency);
    onCurrencyChange(selectedCurrencyFrom, newCurrency);
  };

  const handleSwapCurrencies = () => {
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setSelectedCurrencyTo(selectedCurrencyFrom);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftCript}>
        <TextField
          required
          value={minAmount || ""}
          variant="outlined"
          sx={{
            minWidth: 320,
            maxWidth: 400,
            margin: 0,

            "& .MuiOutlinedInput-root": {
              borderRadius: 5,
              fontSize: "16px",
            },
          }}
        />
        <FormControl sx={{ minWidth: 120, maxWidth: 150, margin: 0 }}>
          <Select
            value={selectedCurrencyFrom}
            onChange={handleCurrencyFromChange}
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              height: 40,
              borderRadius: 5,
              fontSize: "16px",
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
      <div className={styles.icon}>
        <SwapHorizIcon
          sx={{ fontSize: 32, color: "#007bff" }}
          onClick={handleSwapCurrencies}
        />
      </div>
      <div className={styles.rightCript}>
        <TextField
          required
          value={minAmount || ""}
          variant="outlined"
          sx={{
            minWidth: 320,
            maxWidth: 400,
            margin: 0,
            backgroundColor: "#f9f9f9",
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
              fontSize: "16px",
            },
          }}
        />
        <FormControl sx={{ minWidth: 120, maxWidth: 150, margin: 0 }}>
          <Select
            value={selectedCurrencyTo}
            onChange={handleCurrencyToChange}
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              height: 40,
              backgroundColor: "#f9f9f9",
              borderRadius: 4,
              fontSize: "16px",
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
  );
};

export default ExchangeWidget;
