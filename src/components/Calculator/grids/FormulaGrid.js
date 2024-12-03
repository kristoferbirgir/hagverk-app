import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const FormulaGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculate = () => {
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
            value={inputs[variable] || ""}
            onChange={handleInputChange}
            placeholder={`Enter ${variable}`}
            className={styles["grid-input"]}
          />
        </div>
      ))}
      <button className={styles["grid-button"]} onClick={calculate}>
        Calculate
      </button>
      {result !== null && (
        <ResultDisplay result={result * 100} label="Interest Rate (%)" />
      )}
    </div>
  );
};

export default FormulaGrid;
