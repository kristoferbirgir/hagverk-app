import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const EqualPaymentLoanNPVGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    principal: "",
    annualInterestRate: "",
    years: "",
    discountRate: "",
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateLoanNPV = () => {
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
          placeholder="Enter loan interest rate"
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
        <label className={styles["grid-label"]}>Discount Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="discountRate"
          value={inputs.discountRate || ""}
          onChange={handleInputChange}
          placeholder="Enter discount rate"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateLoanNPV}>
        Calculate Loan NPV
      </button>
      {result && (
        <div>
          <ResultDisplay result={`Annual Payment: ${result.annualPayment} ISK`} />
          <ResultDisplay result={`NPV: ${result.npv} ISK`} />
        </div>
      )}
    </div>
  );
};

export default EqualPaymentLoanNPVGrid;
