import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const PeriodicCompoundingGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    presentValue: "",
    annualInterestRate: "",
    compoundingPeriods: "",
    timeInYears: "",
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || "",
    }));
  };

  const calculatePeriodicCompounding = () => {
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
      <div className={styles["grid-section"]}>
        {formula.variables.map((variable) => (
          <div className={styles["grid-row"]} key={variable}>
            <label className={styles["grid-label"]}>{variable}:</label>
            <input
              type="number"
              className={styles["grid-input"]}
              name={variable}
              value={inputs[variable] || ""}
              onChange={handleInputChange}
              placeholder={`Enter ${variable}`}
            />
          </div>
        ))}
      </div>
      <button className={styles["grid-button"]} onClick={calculatePeriodicCompounding}>
        Reikna
      </button>
      {result !== null && (
        <div className={styles["grid-result"]}>
          <ResultDisplay result={result} />
        </div>
      )}
    </div>
  );
};

export default PeriodicCompoundingGrid;
