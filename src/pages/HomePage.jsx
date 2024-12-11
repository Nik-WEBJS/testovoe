import React, { useState } from "react";
import ExchangeWidget from "../components/ExchangeWidget/ExchangeWidget";
import EthAdressField from "../components/EthAdressField/EthAdressField";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [error, setError] = useState(null);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.txt}>
          <h1>Crypto Exchange</h1>
          <p>Exchange fast and easy</p>
        </div>

        <ExchangeWidget setError={setError}/>

        <EthAdressField error={error}/>
      </div>
    </div>
  );
};

export default HomePage;
