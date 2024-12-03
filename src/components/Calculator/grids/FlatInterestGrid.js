import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const FlatInterestGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    presentValue: "",
    annualInterestRate: "",
    years: "",
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || "",
    }));
  };

  const calculateFlatInterest = () => {
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
      {formula.variables.map((variable) => (
        <div key={variable} className={styles["grid-row"]}>
          <label className={styles["grid-label"]}>{variable}:</label>
          <input
            type="number"
            name={variable}
            className={styles["grid-input"]}
            value={inputs[variable] || ""}
            onChange={handleInputChange}
            placeholder={`Enter ${variable}`}
          />
        </div>
      ))}
      <button className={styles["grid-button"]} onClick={calculateFlatInterest}>
        Calculate
      </button>
      {result !== null && <ResultDisplay result={result} />}
    </div>
  );
};

export default FlatInterestGrid;
