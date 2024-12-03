import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const BondCashFlowDurationGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    faceValue: "",
    annualInterestRate: "",
    yieldRate: "",
    yearsToMaturity: "",
  });
  const [result, setResult] = useState(null);
  const [cashFlows, setCashFlows] = useState([]);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateBond = () => {
    try {
      const { totalPrice, averageDuration, cashFlows } = formula.calculate(inputs);
      setResult({ price: totalPrice, duration: averageDuration });
      setCashFlows(cashFlows || []);
    } catch (error) {
      alert(error.message);
    }
  };

  const examples = [
    {
      description:
        "Níutíu þúsund króna skuldabréf með jöfnum afborgunum til 3ja ára ber 10% nafnvexti, sem greiddir eru út árlega á gjalddögum. Beint er að því 8% ávöxtunarkröfu.",
      inputs: {
        faceValue: 90000,
        annualInterestRate: 10,
        yieldRate: 8,
        yearsToMaturity: 3,
      },
    },
  ];

  const applyExample = (exampleInputs) => {
    setInputs(exampleInputs);
    setResult(null);
    setCashFlows([]);
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
      <button className={styles["grid-button"]} onClick={calculateBond}>
        Calculate Bond Price and Duration
      </button>

      {result && (
        <ResultDisplay
          result={{
            price: result.price ? result.price.toFixed(2) : "N/A",
            duration: result.duration ? result.duration.toFixed(2) : "N/A",
          }}
        />
      )}

      {cashFlows.length > 0 && (
        <div className={styles["grid-result"]}>
          <h4>Cash Flows:</h4>
          <ul>
            {cashFlows.map((flow, index) => (
              <li key={index}>
                Year {flow.year}: Payment{" "}
                {flow.payment ? flow.payment.toFixed(2) : "N/A"} ISK, Discounted Payment{" "}
                {flow.discountedPayment ? flow.discountedPayment.toFixed(2) : "N/A"} ISK
              </li>
            ))}
          </ul>
        </div>
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

export default BondCashFlowDurationGrid;
