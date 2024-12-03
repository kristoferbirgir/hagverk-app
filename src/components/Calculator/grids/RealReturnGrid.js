import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const RealReturnGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    oldPrice: "",
    newPrice: "",
    oldCPI: "",
    newCPI: "",
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateRealReturn = () => {
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
        "Í lok mars 2020 var gengi Arion banka 787. Ári síðar var gengi bankans komið í 935. Á sama tímabili hækkaði vísitala neysluverðs úr 266,1 í 279,9. Hver var raunávöxtun hlutabréfa Arion banka skv. þessum gögnum?",
      inputs: {
        oldPrice: 787,
        newPrice: 935,
        oldCPI: 266.1,
        newCPI: 279.9,
      },
    },
  ];

  const applyExample = (exampleInputs) => {
    setInputs(exampleInputs);
    setResult(null); // Reset result when applying a new example
  };

  return (
    <div className={styles["grid-container"]}>
      <h3 className={styles["grid-header"]}>{formula.description}</h3>
      <div>
        <label className={styles["grid-label"]}>Old Price:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="oldPrice"
          value={inputs.oldPrice || ""}
          onChange={handleInputChange}
          placeholder="Enter old price"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>New Price:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="newPrice"
          value={inputs.newPrice || ""}
          onChange={handleInputChange}
          placeholder="Enter new price"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Old CPI:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="oldCPI"
          value={inputs.oldCPI || ""}
          onChange={handleInputChange}
          placeholder="Enter old CPI"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>New CPI:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="newCPI"
          value={inputs.newCPI || ""}
          onChange={handleInputChange}
          placeholder="Enter new CPI"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateRealReturn}>
        Calculate Real Return
      </button>
      {result && <ResultDisplay result={`Real Return: ${(result * 100).toFixed(2)}%`} />}

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

export default RealReturnGrid;
