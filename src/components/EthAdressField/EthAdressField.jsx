/* eslint-disable react/prop-types */
import React from "react";
import { TextField } from "@mui/material";
import styles from "./EthAdressField.module.css";

const EthAdressField = () => {
  return (
    <div className={styles.container}>
      <p>Your Ethereum address</p>
      <TextField required id="outlined-required" value={""} className={styles.ethField}/>
    </div>
  );
};

export default EthAdressField;
