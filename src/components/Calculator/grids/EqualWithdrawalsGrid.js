import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const EqualWithdrawalsGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    presentValue: "",
    annualInterestRate: "",
    startYear: "",
    withdrawalYears: [],
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "withdrawalYears" ? value.split(",").map(Number) : parseFloat(value) || "",
    }));
  };

  const calculateEqualWithdrawals = () => {
    try {
      const result = formula.calculate(inputs);
      setResult(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles["grid-container"]}>
      <h3 className={styles["grid-header"]}>{formula.description}</h3>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Present Value:</label>
        <input
          type="number"
          name="presentValue"
          className={styles["grid-input"]}
          value={inputs.presentValue || ""}
          onChange={handleInputChange}
          placeholder="Enter present value"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Annual Interest Rate (%):</label>
        <input
          type="number"
          name="annualInterestRate"
          className={styles["grid-input"]}
          value={inputs.annualInterestRate || ""}
          onChange={handleInputChange}
          placeholder="Enter annual interest rate"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Starting Year (Accumulation Period):</label>
        <input
          type="number"
          name="startYear"
          className={styles["grid-input"]}
          value={inputs.startYear || ""}
          onChange={handleInputChange}
          placeholder="Enter years before withdrawal starts"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Withdrawal Years (e.g., 6,7,8):</label>
        <input
          type="text"
          name="withdrawalYears"
          className={styles["grid-input"]}
          value={inputs.withdrawalYears.join(",") || ""}
          onChange={handleInputChange}
          placeholder="Enter years separated by commas"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateEqualWithdrawals}>
        Calculate
      </button>
      {result !== null && <ResultDisplay result={result} />}
    </div>
  );
};

export default EqualWithdrawalsGrid;
