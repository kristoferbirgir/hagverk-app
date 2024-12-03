import React, { useState } from "react";
import styles from "./grids.module.css";

const SemiAnnualBondGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    faceValue: "",
    couponRate: "",
    yieldRate: "",
    yearsToMaturity: "",
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false); // Toggle for examples

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateSemiAnnualBond = () => {
    try {
      const result = formula.calculate(inputs);
      setResult(result);
    } catch (error) {
      alert(error.message);
    }
  };

  // Example data
  const examples = [
    {
      description:
        "Tveggja ára skuldabréf, höfuðstól 100 krónur, með 10% vöxtum greiðir vexti tvisvar á ári (vaxtagreiðslubréf). Reiknið verðið á bréfinu ásamt meðaltíma bréfsins miðað við 5% ávöxtunarkröfu.",
      inputs: {
        faceValue: 100,
        couponRate: 10,
        yieldRate: 5,
        yearsToMaturity: 2,
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
        <label className={styles["grid-label"]}>Coupon Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="couponRate"
          value={inputs.couponRate || ""}
          onChange={handleInputChange}
          placeholder="Enter coupon rate"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Yield Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="yieldRate"
          value={inputs.yieldRate || ""}
          onChange={handleInputChange}
          placeholder="Enter yield rate"
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
      <button className={styles["grid-button"]} onClick={calculateSemiAnnualBond}>
        Calculate Bond Price and Duration
      </button>
      {result && (
        <div className={styles["grid-result"]}>
          <p>Bond Price: {result.price.toFixed(2)} ISK</p>
          <p>Duration: {result.duration.toFixed(2)} years</p>
        </div>
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

export default SemiAnnualBondGrid;
