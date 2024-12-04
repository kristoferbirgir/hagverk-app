import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const FutureValueOfCashFlowsGrid = ({ formula }) => {
  const [cashFlowInputs, setCashFlowInputs] = useState([{ amount: "", year: "" }]);
  const [discountRate, setDiscountRate] = useState("");
  const [futureYear, setFutureYear] = useState("");
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleAddCashFlow = () => {
    setCashFlowInputs([...cashFlowInputs, { amount: "", year: "" }]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCashFlows = [...cashFlowInputs];
    updatedCashFlows[index][name] = parseFloat(value) || "";
    setCashFlowInputs(updatedCashFlows);
  };

  const calculateFutureValue = () => {
    try {
      const result = formula.calculate({ cashFlows: cashFlowInputs, discountRate, futureYear });
      setResult(result);
    } catch (error) {
      alert(error.message);
    }
  };

  // Example Data
  const examples = [
    {
      description:
        "Greiðsluflæði gefur 100 eftir tvö ár og 200 eftir 3,5 ár. Framtíðarvirði greiðsluflæðis á ári 3 er m.v. 10% ávöxtunarkröfu.",
      inputs: {
        discountRate: 10,
        futureYear: 3,
        cashFlows: [
          { amount: 100, year: 2 },
          { amount: 200, year: 3.5 },
        ],
      },
    },
  ];

  const applyExample = (exampleInputs) => {
    setDiscountRate(exampleInputs.discountRate);
    setFutureYear(exampleInputs.futureYear);
    setCashFlowInputs(exampleInputs.cashFlows);
    setResult(null); // Reset the result
  };

  return (
    <div className={styles["grid-container"]}>
      <h3 className={styles["grid-header"]}>{formula.description}</h3>
      <div>
        <label className={styles["grid-label"]}>Discount Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          value={discountRate}
          onChange={(e) => setDiscountRate(parseFloat(e.target.value) || "")}
          placeholder="Enter discount rate"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Future Year:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          value={futureYear}
          onChange={(e) => setFutureYear(parseFloat(e.target.value) || "")}
          placeholder="Enter future year"
        />
      </div>
      <div>
        <h4 className={styles["grid-section"]}>Cash Flows</h4>
        {cashFlowInputs.map((cashFlow, index) => (
          <div key={index} className={styles["grid-row"]}>
            <label className={styles["grid-label"]}>Amount:</label>
            <input
              type="number"
              className={styles["grid-input"]}
              name="amount"
              value={cashFlow.amount || ""}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter amount"
            />
            <label className={styles["grid-label"]}>Year:</label>
            <input
              type="number"
              className={styles["grid-input"]}
              name="year"
              value={cashFlow.year || ""}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter year"
            />
          </div>
        ))}
        <button className={styles["grid-button"]} onClick={handleAddCashFlow}>
          Add Another Cash Flow
        </button>
      </div>
      <button className={styles["grid-button"]} onClick={calculateFutureValue}>
        Calculate Future Value
      </button>
      {result !== null && <ResultDisplay result={result} />}

      {/* Examples Section */}
      <div className={styles["examples-container"]}>
        <button
          className={styles["toggle-examples-button"]}
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

export default FutureValueOfCashFlowsGrid;
