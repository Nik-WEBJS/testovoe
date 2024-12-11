/* eslint-disable react/prop-types */
import React from "react";
import { TextField } from "@mui/material";
import styles from "./EthAdressField.module.css";
import { Button } from "@mui/material";

const EthAdressField = ({ error }) => {
  return (
    <div className={styles.container}>
      <p>Your Ethereum address</p>
      <div className={styles.adressField}>
        <TextField
          required
          id="outlined-required"
          value={""}
          className={styles.ethField}
        />
        <Button variant="contained" disabled={error}>
          Exchange
        </Button>
      </div>
      {error && (
        <p style={{ color: "red", textAlign: "end" }}>
          {" "}
          this pair is disabled now
        </p>
      )}
    </div>
  );
};

export default EthAdressField;
