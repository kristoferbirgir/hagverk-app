import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const PEComparisonGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    peRatio: "", // P/E Ratio (V/H hlutfall)
    earnings: "", // Earnings (Hagnaður)
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateValuation = () => {
    try {
      const { peRatio, earnings } = inputs;

      const result = formula.calculate({ peRatio, earnings });

      setResult({
        valuation: result.valuation.toFixed(2),
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const examples = [
    {
      description:
        "Fyrirtæki A hefur V/H hlutfall upp á 7,5. Fyrirtæki B mun skila hagnaði upp á 1.200.000. Hvert er virði B m.v. V/H kennitölusamanburðinn?",
      inputs: {
        peRatio: 7.5,
        earnings: 1200000,
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
        <label className={styles["grid-label"]}>P/E Ratio (V/H hlutfall):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="peRatio"
          value={inputs.peRatio || ""}
          onChange={handleInputChange}
          placeholder="Enter P/E Ratio"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Earnings (Hagnaður):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="earnings"
          value={inputs.earnings || ""}
          onChange={handleInputChange}
          placeholder="Enter Earnings"
        />
      </div>

      <button className={styles["grid-button"]} onClick={calculateValuation}>
        Calculate Valuation
      </button>

      {result && (
        <ResultDisplay result={`Valuation: ${result.valuation} kr.`} />
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

export default PEComparisonGrid;
