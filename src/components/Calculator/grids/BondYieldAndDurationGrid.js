import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const BondYieldAndDurationGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    faceValue: "",
    annualInterestRate: "",
    currentPrice: "",
    yearsToMaturity: "",
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateBond = () => {
    try {
      const { yieldRate, averageDuration } = formula.calculate(inputs);
      setResult({ yieldRate, averageDuration });
    } catch (error) {
      alert(error.message);
    }
  };

  const examples = [
    {
      description:
        "Vaxtagreiðslubréf með lokadag eftir þrjú ár ber 6% árlega nafnvexti sem eru greiddir árlega. Nafnvirðið er 100 kr. Í dag er hreint verð bréfsins 107 krónur. Hver er ávöxtunarkrafa skuldabréfsins í dag og hver er meðaltíminn?",
      inputs: {
        faceValue: 100,
        annualInterestRate: 6,
        currentPrice: 107,
        yearsToMaturity: 3,
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
      <div>
        <label className={styles["grid-label"]}>Face Value (ISK):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="faceValue"
          value={inputs.faceValue || ""}
          onChange={handleInputChange}
          placeholder="Enter face value"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Annual Interest Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="annualInterestRate"
          value={inputs.annualInterestRate || ""}
          onChange={handleInputChange}
          placeholder="Enter annual interest rate"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Current Price (ISK):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="currentPrice"
          value={inputs.currentPrice || ""}
          onChange={handleInputChange}
          placeholder="Enter current price"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Years to Maturity:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="yearsToMaturity"
          value={inputs.yearsToMaturity || ""}
          onChange={handleInputChange}
          placeholder="Enter years to maturity"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateBond}>
        Calculate Yield and Duration
      </button>

      {result && (
        <ResultDisplay
          result={`Yield Rate: ${result.yieldRate}% | Average Duration: ${result.averageDuration} years`}
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

export default BondYieldAndDurationGrid;
