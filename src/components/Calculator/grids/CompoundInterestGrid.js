import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const CompoundInterestGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    presentValue: "",
    annualInterestRate: "",
    timeInYears: "",
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || "",
    }));
  };

  const calculateCompoundInterest = () => {
    try {
      const result = formula.calculate(inputs);
      setResult(result);
    } catch (error) {
      alert(error.message);
    }
  };

  const examples = [
    {
      description:
        "Ef við leggjum inn 1.000.000 inn á reikning sem gefur 4,25% árlega ávöxtun þá eigum við eftir 30 ár.",
      inputs: {
        presentValue: 1000000,
        annualInterestRate: 4.25,
        timeInYears: 30,
      },
    },
  ];

  const applyExample = (exampleInputs) => {
    setInputs(exampleInputs);
    setResult(null); // Clear result when applying a new example
  };

  return (
    <div className={styles["grid-container"]}>
      <h3 className={styles["grid-header"]}>{formula.description}</h3>
      {formula.variables.map((variable) => (
        <div key={variable} className={styles["grid-row"]}>
          <label className={styles["grid-label"]}>{variable}:</label>
          <input
            type="number"
            name={variable}
            className={styles["grid-input"]}
            value={inputs[variable] || ""}
            onChange={handleInputChange}
            placeholder={`Enter ${variable}`}
          />
        </div>
      ))}
      <button className={styles["grid-button"]} onClick={calculateCompoundInterest}>
        Calculate
      </button>
      {result !== null && <ResultDisplay result={result} />}

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

export default CompoundInterestGrid;
