import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const FutureValueOfCashFlowsGrid = ({ formula }) => {
  const [cashFlowInputs, setCashFlowInputs] = useState([{ amount: "", year: "" }]);
  const [discountRate, setDiscountRate] = useState("");
  const [futureYear, setFutureYear] = useState("");
  const [result, setResult] = useState(null);

  const handleAddCashFlow = () => {
    setCashFlowInputs([...cashFlowInputs, { amount: "", year: "" }]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCashFlows = [...cashFlowInputs];
    updatedCashFlows[index][name] = parseFloat(value) || "";
    setCashFlowInputs(updatedCashFlows);
  };

  const calculateFutureValue = () => {
    try {
      const result = formula.calculate({ cashFlows: cashFlowInputs, discountRate, futureYear });
      setResult(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles["grid-container"]}>
      <h3 className={styles["grid-header"]}>{formula.description}</h3>
      <div>
        <label className={styles["grid-label"]}>Discount Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          value={discountRate}
          onChange={(e) => setDiscountRate(parseFloat(e.target.value) || "")}
          placeholder="Enter discount rate"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Future Year:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          value={futureYear}
          onChange={(e) => setFutureYear(parseFloat(e.target.value) || "")}
          placeholder="Enter future year"
        />
      </div>
      <div>
        <h4>Cash Flows</h4>
        {cashFlowInputs.map((cashFlow, index) => (
          <div key={index} className={styles["grid-row"]}>
            <label className={styles["grid-label"]}>Amount:</label>
            <input
              type="number"
              className={styles["grid-input"]}
              name="amount"
              value={cashFlow.amount || ""}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter amount"
            />
            <label className={styles["grid-label"]}>Year:</label>
            <input
              type="number"
              className={styles["grid-input"]}
              name="year"
              value={cashFlow.year || ""}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter year"
            />
          </div>
        ))}
        <button className={styles["grid-button"]} onClick={handleAddCashFlow}>
          Add Another Cash Flow
        </button>
      </div>
      <button className={styles["grid-button"]} onClick={calculateFutureValue}>
        Calculate Future Value
      </button>
      {result !== null && <ResultDisplay result={result} />}
    </div>
  );
};

export default FutureValueOfCashFlowsGrid;
