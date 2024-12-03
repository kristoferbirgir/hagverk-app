import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const EqualPaymentBondGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    principal: "",
    annualInterestRate: "",
    years: "",
    targetYear: "",
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateBondDetails = () => {
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
        <label className={styles["grid-label"]}>Principal (ISK):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="principal"
          value={inputs.principal || ""}
          onChange={handleInputChange}
          placeholder="Enter principal amount"
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
        <label className={styles["grid-label"]}>Loan Term (Years):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="years"
          value={inputs.years || ""}
          onChange={handleInputChange}
          placeholder="Enter loan term"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Target Year:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="targetYear"
          value={inputs.targetYear || ""}
          onChange={handleInputChange}
          placeholder="Enter target year"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateBondDetails}>
        Calculate Payment Details
      </button>
      {result && (
        <ResultDisplay
          result={`Annual Payment: ${result.annualPayment.toFixed(2)} ISK, 
          Interest Payment: ${result.interestPayment.toFixed(2)} ISK, 
          Principal Payment: ${result.principalPayment.toFixed(2)} ISK, 
          Remaining Principal After Payment: ${result.remainingPrincipalAfterPayment.toFixed(2)} ISK`}
        />
      )}
    </div>
  );
};

export default EqualPaymentBondGrid;
