import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const CAPMGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    riskFreeRate: "",
    beta: "",
    marketReturn: "",
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateCAPM = () => {
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
        "Bréf A er með beta-gildið 1,78. Áhættulausir vextir eru metnir 8% og vænt ávöxtun markaðssafns M er 12%. Hver er vænt ávöxtun bréfs A samkvæmt CAPM módelinu?",
      inputs: {
        riskFreeRate: 8,
        beta: 1.78,
        marketReturn: 12,
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
        <label className={styles["grid-label"]}>Risk-Free Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="riskFreeRate"
          value={inputs.riskFreeRate || ""}
          onChange={handleInputChange}
          placeholder="Enter risk-free rate"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Beta:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="beta"
          value={inputs.beta || ""}
          onChange={handleInputChange}
          placeholder="Enter beta value"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Market Return (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="marketReturn"
          value={inputs.marketReturn || ""}
          onChange={handleInputChange}
          placeholder="Enter market return"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateCAPM}>
        Calculate Expected Return
      </button>

      {result && (
        <ResultDisplay
          result={`Expected Return: ${
            result.expectedReturn ? result.expectedReturn + "%" : "N/A"
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

export default CAPMGrid;
