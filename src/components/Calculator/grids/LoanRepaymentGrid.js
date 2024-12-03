import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const LoanRepaymentGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    loanAmount: "",
    interestRate: "",
    loanDuration: "",
    paymentYear: "",
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || "",
    }));
  };

  const calculateRepayment = () => {
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
        <label className={styles["grid-label"]}>Loan Amount:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="loanAmount"
          value={inputs.loanAmount || ""}
          onChange={handleInputChange}
          placeholder="Enter loan amount"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Interest Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="interestRate"
          value={inputs.interestRate || ""}
          onChange={handleInputChange}
          placeholder="Enter annual interest rate"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Loan Duration (Years):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="loanDuration"
          value={inputs.loanDuration || ""}
          onChange={handleInputChange}
          placeholder="Enter loan duration"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Payment Year:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="paymentYear"
          value={inputs.paymentYear || ""}
          onChange={handleInputChange}
          placeholder="Enter the payment year"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateRepayment}>
        Calculate Repayment
      </button>
      {result !== null && <ResultDisplay result={result} />}
    </div>
  );
};

export default LoanRepaymentGrid;
