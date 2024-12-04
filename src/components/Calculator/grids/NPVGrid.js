import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const NPVGrid = ({ formula }) => {
  const [cashFlowInputs, setCashFlowInputs] = useState([{ revenue: "", cost: "", year: "" }]);
  const [discountRate, setDiscountRate] = useState("");
  const [initialCost, setInitialCost] = useState("");
  const [result, setResult] = useState(null);

  const handleAddCashFlow = () => {
    setCashFlowInputs([...cashFlowInputs, { revenue: "", cost: "", year: "" }]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCashFlows = [...cashFlowInputs];
    updatedCashFlows[index][name] = parseFloat(value) || "";
    setCashFlowInputs(updatedCashFlows);
  };

  const calculateNPV = () => {
    try {
      const result = formula.calculate({
        cashFlows: cashFlowInputs,
        discountRate,
        initialCost: parseFloat(initialCost),
      });
      setResult(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles["grid-container"]}>
      <h3 className={styles["grid-header"]}>{formula.description}</h3>
      <div>
        <label className={styles["grid-label"]}>Upphafskostnaður:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          value={initialCost}
          onChange={(e) => setInitialCost(parseFloat(e.target.value) || "")}
          placeholder="Enter initial cost"
        />
      </div>
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
        <h4>Cash Flows</h4>
        {cashFlowInputs.map((cashFlow, index) => (
          <div key={index} className={styles["grid-row"]}>
            <label className={styles["grid-label"]}>Rekstrartekjur:</label>
            <input
              type="number"
              className={styles["grid-input"]}
              name="revenue"
              value={cashFlow.revenue || ""}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter revenue"
            />
            <label className={styles["grid-label"]}>Kostnaður:</label>
            <input
              type="number"
              className={styles["grid-input"]}
              name="cost"
              value={cashFlow.cost || ""}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter cost"
            />
            <label className={styles["grid-label"]}>Tími (Ár):</label>
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
          Bæta við Sjóðstreymi
        </button>
      </div>
      <button className={styles["grid-button"]} onClick={calculateNPV}>
        Reikna NPV
      </button>
      {result !== null && <ResultDisplay result={result} />}
    </div>
  );
};

export default NPVGrid;
