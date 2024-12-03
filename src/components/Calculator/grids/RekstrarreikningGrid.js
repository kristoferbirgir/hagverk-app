import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const RekstrarreikningGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    revenue: "",
    expenses: "",
    depreciation: "",
    interestBearingDebt: "",
    interestRate: "",
    taxRate: "",
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateRekstrarreikning = () => {
    try {
      const results = formula.calculate(inputs);
      setResult(results);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles["grid-container"]}>
      <h3 className={styles["grid-header"]}>{formula.description}</h3>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Revenue (ISK):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="revenue"
          value={inputs.revenue || ""}
          onChange={handleInputChange}
          placeholder="Enter revenue"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Expenses (ISK):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="expenses"
          value={inputs.expenses || ""}
          onChange={handleInputChange}
          placeholder="Enter expenses"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Depreciation (ISK):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="depreciation"
          value={inputs.depreciation || ""}
          onChange={handleInputChange}
          placeholder="Enter depreciation"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Interest Bearing Debt (ISK):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="interestBearingDebt"
          value={inputs.interestBearingDebt || ""}
          onChange={handleInputChange}
          placeholder="Enter interest-bearing debt"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Interest Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="interestRate"
          value={inputs.interestRate || ""}
          onChange={handleInputChange}
          placeholder="Enter interest rate"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Tax Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="taxRate"
          value={inputs.taxRate || ""}
          onChange={handleInputChange}
          placeholder="Enter tax rate"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateRekstrarreikning}>
        Calculate Rekstrarreikning
      </button>
      {result && (
        <ResultDisplay
          result={`EBITDA: ${result.EBITDA} ISK | EBIT: ${result.EBIT} ISK | 
          Interest Expenses: ${result.InterestExpenses} ISK | 
          Pre-Tax Income: ${result.PreTaxIncome} ISK | Tax: ${result.Tax} ISK | 
          Net Income: ${result.NetIncome} ISK`}
        />
      )}
    </div>
  );
};

export default RekstrarreikningGrid;
