import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const PresentValueLoanGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    principal: "",
    annualInterestRate: "",
    discountRate: "",
    numPayments: "",
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false); // Toggle for examples

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculatePresentValue = () => {
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
        "Lán A er jafngreiðslulán með tveimur gjalddögum, eftir 1 ár og svo eftir 2 ár. Höfuðstóll er 100 og árlegir vextir eru 5%. Hvert er núvirði láns m.v. ávöxtunarkröfuna 4%?",
      inputs: {
        principal: 100,
        annualInterestRate: 5,
        discountRate: 4,
        numPayments: 2,
      },
    },
  ];

  const applyExample = (exampleInputs) => {
    setInputs(exampleInputs);
  };

  return (
    <div className={styles["grid-container"]}>
      <h3 className={styles["grid-header"]}>{formula.description}</h3>
      <div>
        <label className={styles["grid-label"]}>Principal (ISK):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="principal"
          value={inputs.principal || ""}
          onChange={handleInputChange}
          placeholder="Enter loan principal"
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
        <label className={styles["grid-label"]}>Discount Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="discountRate"
          value={inputs.discountRate || ""}
          onChange={handleInputChange}
          placeholder="Enter discount rate"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Number of Payments:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="numPayments"
          value={inputs.numPayments || ""}
          onChange={handleInputChange}
          placeholder="Enter number of payments"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculatePresentValue}>
        Calculate Present Value
      </button>
      {result && <ResultDisplay result={`Present Value: ${result.toFixed(2)} ISK`} />}

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

export default PresentValueLoanGrid;
