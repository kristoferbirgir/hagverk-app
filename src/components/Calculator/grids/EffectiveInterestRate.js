import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const EffectiveInterestRate = ({ formula }) => {
  const [inputs, setInputs] = useState({
    nominalRate: "",
    compoundingPeriods: "",
  });
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
      <div>
        <label className={styles["grid-label"]}>Nominal Rate (%):</label>
        <input
          type="number"
          name="nominalRate"
          className={styles["grid-input"]}
          value={inputs.nominalRate}
          onChange={handleInputChange}
          placeholder="Enter nominal rate"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Compounding Periods (n):</label>
        <input
          type="number"
          name="compoundingPeriods"
          className={styles["grid-input"]}
          value={inputs.compoundingPeriods}
          onChange={handleInputChange}
          placeholder="Enter compounding periods"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculate}>
        Calculate Effective Interest Rate
      </button>
      {result !== null && <ResultDisplay result={result} />}
    </div>
  );
};

export default EffectiveInterestRate;
