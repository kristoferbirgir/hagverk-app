import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const RiskFreeRateGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    expectedReturnA: "",
    expectedReturnB: "",
    betaA: "",
    betaB: "",
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateRiskFreeRate = () => {
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
        "Eign A er með vænta ávöxtun upp á 13% og eign B upp á 15%. Beta gildi eignar A er 1,5 og eignar B 2,0. Hverjir eru áhættulausir vextir skv. CAPM?",
      inputs: {
        expectedReturnA: 13,
        expectedReturnB: 15,
        betaA: 1.5,
        betaB: 2.0,
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
        <label className={styles["grid-label"]}>Expected Return A (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="expectedReturnA"
          value={inputs.expectedReturnA || ""}
          onChange={handleInputChange}
          placeholder="Enter expected return for Asset A"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Expected Return B (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="expectedReturnB"
          value={inputs.expectedReturnB || ""}
          onChange={handleInputChange}
          placeholder="Enter expected return for Asset B"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Beta A:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="betaA"
          value={inputs.betaA || ""}
          onChange={handleInputChange}
          placeholder="Enter beta for Asset A"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Beta B:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="betaB"
          value={inputs.betaB || ""}
          onChange={handleInputChange}
          placeholder="Enter beta for Asset B"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateRiskFreeRate}>
        Calculate Risk-Free Rate
      </button>

      {result && (
        <ResultDisplay
          result={`Risk-Free Rate: ${
            result.riskFreeRate ? result.riskFreeRate + "%" : "N/A"
          }`}
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

export default RiskFreeRateGrid;
