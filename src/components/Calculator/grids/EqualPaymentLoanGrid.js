import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const EqualPaymentLoanGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    principal: "",
    annualInterestRate: "",
    years: "",
    paymentNumber: "",
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateLoanDetails = () => {
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
        <label className={styles["grid-label"]}>Loan Principal (ISK):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="principal"
          value={inputs.principal || ""}
          onChange={handleInputChange}
          placeholder="Enter loan principal"
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
          placeholder="Enter loan term in years"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Payment Number:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="paymentNumber"
          value={inputs.paymentNumber || ""}
          onChange={handleInputChange}
          placeholder="Enter payment number"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateLoanDetails}>
        Calculate Payment Details
      </button>
      {result && (
        <ResultDisplay
          result={`Payment: ${result.payment.toFixed(2)} ISK, 
          Interest: ${result.interest.toFixed(2)} ISK, 
          Principal Payment: ${result.principalPayment.toFixed(2)} ISK, 
          Remaining Principal: ${result.remainingPrincipal.toFixed(2)} ISK`}
        />
      )}
    </div>
  );
};

export default EqualPaymentLoanGrid;
