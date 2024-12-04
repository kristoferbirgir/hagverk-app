import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const BalanceSheetGrid = () => {
  const [inputs, setInputs] = useState({
    equity: "",
    loanAmount: "",
    interestRate: "",
    loanTerm: "",
    fixedAssets: "",
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateBalanceSheet = () => {
    try {
      const { equity, loanAmount, interestRate, loanTerm, fixedAssets } = inputs;

      if (!equity || !loanAmount || !loanTerm || !fixedAssets) {
        throw new Error("Please fill in all required fields.");
      }

      // Calculate annual payment for the loan (equal payments method)
      const annualInterestRate = interestRate / 100;
      const annualPayment =
        (loanAmount * annualInterestRate) /
        (1 - Math.pow(1 + annualInterestRate, -loanTerm));

      // Calculate total assets and cash
      const totalAssets = fixedAssets + equity + loanAmount;
      const cash = totalAssets - fixedAssets - equity;

      setResult({
        totalAssets: totalAssets.toFixed(2),
        cash: cash.toFixed(2),
        annualPayment: annualPayment.toFixed(2),
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const examples = [
    {
      description:
        "Á stofndegi fyrirtækis er eigið fé 100, félagið fær lán með jöfnum afborgunum með 5% vöxtum til 10 ára að fjárhæð 200. Fastafjármunir eru 200 og afgangur er geymdur á bankareikningi fyrirtækis.",
      inputs: {
        equity: 100,
        loanAmount: 200,
        interestRate: 5,
        loanTerm: 10,
        fixedAssets: 200,
      },
    },
  ];

  const applyExample = (exampleInputs) => {
    setInputs(exampleInputs);
    setResult(null);
  };

  return (
    <div className={styles["grid-container"]}>
      <h3 className={styles["grid-header"]}>Efnahagsreikningur</h3>

      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Equity (Eigið fé):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="equity"
          value={inputs.equity || ""}
          onChange={handleInputChange}
          placeholder="Enter equity amount"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Loan Amount (Lán):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="loanAmount"
          value={inputs.loanAmount || ""}
          onChange={handleInputChange}
          placeholder="Enter loan amount"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Interest Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="interestRate"
          value={inputs.interestRate || ""}
          onChange={handleInputChange}
          placeholder="Enter annual interest rate"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Loan Term (Years):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="loanTerm"
          value={inputs.loanTerm || ""}
          onChange={handleInputChange}
          placeholder="Enter loan term in years"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Fixed Assets (Fastafjármunir):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="fixedAssets"
          value={inputs.fixedAssets || ""}
          onChange={handleInputChange}
          placeholder="Enter fixed assets amount"
        />
      </div>

      <button className={styles["grid-button"]} onClick={calculateBalanceSheet}>
        Calculate
      </button>

      {result && (
        <ResultDisplay
          result={`Total Assets: ${result.totalAssets} | Cash: ${result.cash} | Annual Loan Payment: ${result.annualPayment}`}
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

export default BalanceSheetGrid;
