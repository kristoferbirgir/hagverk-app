import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const WACCGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    costOfEquity: "",
    costOfDebt: "",
    taxRate: "",
    debtRatio: "",
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateWACC = () => {
    try {
      const results = formula.calculate(inputs);
      setResult(results);
    } catch (error) {
      alert(error.message);
    }
  };

  const examples = [
    {
      description:
        "Gerum ráð fyrir að fjármagnskostnaður eigin fjár fyrirtækis sé 18% og fjármagnskostnaður fyrir skatta sé 8%. Ef markmið um skuldahlutfall (debt ratio) er 0,2 og skattaprósentan er 38%, hvert er þá vegið meðaltal fjármagnskostnaðar (WACC) fyrir fyrirtækið?",
      inputs: {
        costOfEquity: 18,
        costOfDebt: 8,
        taxRate: 38,
        debtRatio: 0.2,
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
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Cost of Equity (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="costOfEquity"
          value={inputs.costOfEquity || ""}
          onChange={handleInputChange}
          placeholder="Enter cost of equity"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Cost of Debt (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="costOfDebt"
          value={inputs.costOfDebt || ""}
          onChange={handleInputChange}
          placeholder="Enter cost of debt"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Tax Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="taxRate"
          value={inputs.taxRate || ""}
          onChange={handleInputChange}
          placeholder="Enter tax rate"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Debt Ratio:</label>
        <input
          type="number"
          step="0.01"
          className={styles["grid-input"]}
          name="debtRatio"
          value={inputs.debtRatio || ""}
          onChange={handleInputChange}
          placeholder="Enter debt ratio"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateWACC}>
        Calculate WACC
      </button>

      {result && (
        <ResultDisplay
          result={`WACC: ${result.wacc ? result.wacc + "%" : "N/A"}`}
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

export default WACCGrid;
