import React from "react";
import ExchangeWidget from "../components/ExchangeWidget/ExchangeWidget";
import EthAdressField from "../components/EthAdressField/EthAdressField";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.txt}>
          <h1>Crypto Exchange</h1>
          <p>Exchange fast and easy</p>
        </div>

        <ExchangeWidget />

        <EthAdressField />
      </div>
    </div>
  );
};

export default HomePage;
