import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const CashFlowGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    operatingCashFlow: "", // Veltufé frá rekstri
    accountsPayableChange: "", // Lækkun á viðskiptaskuldum
    inventoryChange: "", // Hækkun á birgðum
    otherAdjustments: "", // Aðrar stillingar (optional)
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateCashFlow = () => {
    try {
      const { operatingCashFlow, accountsPayableChange, inventoryChange, otherAdjustments } = inputs;

      const result = formula.calculate({
        operatingCashFlow,
        accountsPayableChange,
        inventoryChange,
        otherAdjustments,
      });

      setResult({
        cashFlow: result.cashFlow.toFixed(2),
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const examples = [
    {
      description:
        "Veltufé frá rekstri fyrirtækis eitt árið var 627.468 kr. Á sama ári lækkuðu viðskiptaskuldir um 160.000 kr. og birgðir hækkuðu um 150.000 kr. Handbært fé frá rekstri fyrirtækis er:",
      inputs: {
        operatingCashFlow: 627468,
        accountsPayableChange: -160000, // Lækkun á skuldum
        inventoryChange: 150000, // Hækkun á birgðum
        otherAdjustments: 0, // No other adjustments in this example
      },
    },
  ];

  const applyExample = (exampleInputs) => {
    setInputs(exampleInputs);
    setResult(null);
  };

  return (
    <div className={styles["grid-container"]}>
      <h3 className={styles["grid-header"]}>{formula.description}</h3>

      {/* Input Fields */}
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Operating Cash Flow (Veltufé frá rekstri):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="operatingCashFlow"
          value={inputs.operatingCashFlow || ""}
          onChange={handleInputChange}
          placeholder="Enter operating cash flow"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Change in Accounts Payable (Lækkun viðskiptaskuldir):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="accountsPayableChange"
          value={inputs.accountsPayableChange || ""}
          onChange={handleInputChange}
          placeholder="Enter accounts payable change"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Change in Inventory (Hækkun birgða):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="inventoryChange"
          value={inputs.inventoryChange || ""}
          onChange={handleInputChange}
          placeholder="Enter inventory change"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Other Adjustments (Aðrar stillingar):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="otherAdjustments"
          value={inputs.otherAdjustments || ""}
          onChange={handleInputChange}
          placeholder="Enter other adjustments (optional)"
        />
      </div>

      <button className={styles["grid-button"]} onClick={calculateCashFlow}>
        Calculate Cash Flow
      </button>

      {result && (
        <ResultDisplay
          result={`Cash Flow from Operations: ${result.cashFlow} kr.`}
        />
      )}

      {/* Examples Section */}
      <div className={styles["examples-container"]}>
        <button
          className={styles["grid-button"]}
          onClick={() => setShowExamples(!showExamples)}
        >
          {showExamples ? "Hide Examples" : "Show Examples"}
        </button>
        {showExamples && (
          <div className={styles["examples-list"]}>
            <h4>Examples:</h4>
            {examples.map((example, index) => (
              <div key={index} className={styles["example-item"]}>
                <p>{example.description}</p>
                <button
                  className={styles["grid-button"]}
                  onClick={() => applyExample(example.inputs)}
                >
                  Use Example
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CashFlowGrid;
