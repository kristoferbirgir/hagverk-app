import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const EqualPrincipalBondInterestGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    principal: "",
    annualInterestRate: "",
    termYears: "",
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateInterest = () => {
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
      <div>
        <label className={styles["grid-label"]}>Principal:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="principal"
          value={inputs.principal || ""}
          onChange={handleInputChange}
          placeholder="Enter principal"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Annual Interest Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="annualInterestRate"
          value={inputs.annualInterestRate || ""}
          onChange={handleInputChange}
          placeholder="Enter annual interest rate"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Term (Years):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="termYears"
          value={inputs.termYears || ""}
          onChange={handleInputChange}
          placeholder="Enter term in years"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateInterest}>
        Calculate Total Interest
      </button>
      {result !== null && <ResultDisplay result={result} />}
    </div>
  );
};

export default EqualPrincipalBondInterestGrid;
