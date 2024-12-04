import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const PortfolioReturnGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    returns: [{ asset: "A", value: "" }, { asset: "B", value: "" }], // Expected returns
    weights: [{ asset: "A", value: "" }, { asset: "B", value: "" }], // Weights
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e, type, index) => {
    const { value } = e.target;
    const updated = [...inputs[type]];
    updated[index].value = parseFloat(value) || "";
    setInputs((prev) => ({ ...prev, [type]: updated }));
  };

  const calculatePortfolioReturn = () => {
    try {
      const returns = inputs.returns.map((r) => r.value / 100); // Convert to decimals
      const weights = inputs.weights.map((w) => w.value / 100); // Convert to decimals

      const result = formula.calculate({ returns, weights });

      setResult({
        expectedReturn: (result.expectedReturn * 100).toFixed(2), // Convert back to percentage
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const examples = [
    {
      description:
        "Verkefni A: Vænt ávöxtun 5,50% og staðalfrávik 7,5%\nVerkefni B: Vænt ávöxtun 3,55% og staðalfrávik 6,5%\nSafn: 20% í A og 80% í B. Hver er vænt ávöxtun safns?",
      inputs: {
        returns: [
          { asset: "A", value: 5.5 },
          { asset: "B", value: 3.55 },
        ],
        weights: [
          { asset: "A", value: 20 },
          { asset: "B", value: 80 },
        ],
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

      {/* Input Fields for Returns */}
      <div className={styles["grid-section"]}>
        <h4>Expected Returns (Vænt ávöxtun):</h4>
        {inputs.returns.map((item, index) => (
          <div className={styles["grid-row"]} key={index}>
            <label className={styles["grid-label"]}>Asset {item.asset} (%):</label>
            <input
              type="number"
              className={styles["grid-input"]}
              value={item.value || ""}
              onChange={(e) => handleInputChange(e, "returns", index)}
              placeholder={`Return for ${item.asset}`}
            />
          </div>
        ))}
      </div>

      {/* Input Fields for Weights */}
      <div className={styles["grid-section"]}>
        <h4>Weights (Hlutföll):</h4>
        {inputs.weights.map((item, index) => (
          <div className={styles["grid-row"]} key={index}>
            <label className={styles["grid-label"]}>Asset {item.asset} (%):</label>
            <input
              type="number"
              className={styles["grid-input"]}
              value={item.value || ""}
              onChange={(e) => handleInputChange(e, "weights", index)}
              placeholder={`Weight for ${item.asset}`}
            />
          </div>
        ))}
      </div>

      <button className={styles["grid-button"]} onClick={calculatePortfolioReturn}>
        Calculate Portfolio Return
      </button>

      {result && (
        <ResultDisplay result={`Portfolio Expected Return: ${result.expectedReturn}%`} />
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

export default PortfolioReturnGrid;
