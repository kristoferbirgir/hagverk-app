import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const AnnualizedReturnGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    initialPrice: "",
    finalPrice: "",
    timeInWeeks: "",
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateAnnualizedReturn = () => {
    try {
      const { annualizedReturn } = formula.calculate(inputs);
      setResult({ annualizedReturn });
    } catch (error) {
      alert(error.message);
    }
  };

  const examples = [
    {
      description:
        "Á 8 vikum hækkar verð á ólíutunnum úr $52 í $62. Hver er ávöxtun á ársgrundvelli?",
      inputs: {
        initialPrice: 52,
        finalPrice: 62,
        timeInWeeks: 8,
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
        <label className={styles["grid-label"]}>Initial Price ($):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="initialPrice"
          value={inputs.initialPrice || ""}
          onChange={handleInputChange}
          placeholder="Enter initial price"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Final Price ($):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="finalPrice"
          value={inputs.finalPrice || ""}
          onChange={handleInputChange}
          placeholder="Enter final price"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Time in Weeks:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="timeInWeeks"
          value={inputs.timeInWeeks || ""}
          onChange={handleInputChange}
          placeholder="Enter time in weeks"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateAnnualizedReturn}>
        Calculate Annualized Return
      </button>

      {result && (
        <ResultDisplay
          result={`Annualized Return: ${
            result.annualizedReturn ? result.annualizedReturn + "%" : "N/A"
          }`}
        />
      )}

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

export default AnnualizedReturnGrid;
