import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const APRLoanGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    loanAmount: "",
    paymentAmount: "",
    numPayments: "",
    loanFee: "",
    paymentFee: "",
    timeInYears: "",
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false); // Toggle for examples

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const calculateAPR = () => {
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
        "Búð býður vaxtalaust neyslulán til 6 mánaða. Lánið, 10.000 kr, er greitt með einni greiðslu eftir 6 mánuði en er með 3,5% lántökugjaldi sem er dregið frá þegar lánið er fyrst greitt út. Greiðslugjald upp á 400 kr. er einnig lagt á hverja greiðslu. Hver er árleg hlutfallstala kostnaðar lánsins?",
      inputs: {
        loanAmount: 10000,
        paymentAmount: 10000, // Paid in one installment after 6 months
        numPayments: 1,
        loanFee: 350, // 3.5% of the loan
        paymentFee: 400, // Charged on the single payment
        timeInYears: 0.5, // 6 months = 0.5 years
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
        <label className={styles["grid-label"]}>Loan Amount (ISK):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="loanAmount"
          value={inputs.loanAmount || ""}
          onChange={handleInputChange}
          placeholder="Enter loan amount"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Payment Amount (ISK):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="paymentAmount"
          value={inputs.paymentAmount || ""}
          onChange={handleInputChange}
          placeholder="Enter payment amount"
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
      <div>
        <label className={styles["grid-label"]}>Loan Fee (ISK):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="loanFee"
          value={inputs.loanFee || ""}
          onChange={handleInputChange}
          placeholder="Enter loan fee"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Payment Fee (ISK):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="paymentFee"
          value={inputs.paymentFee || ""}
          onChange={handleInputChange}
          placeholder="Enter payment fee"
        />
      </div>
      <div>
        <label className={styles["grid-label"]}>Loan Term (Years):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="timeInYears"
          value={inputs.timeInYears || ""}
          onChange={handleInputChange}
          placeholder="Enter loan term in years"
        />
      </div>
      <button className={styles["grid-button"]} onClick={calculateAPR}>
        Calculate APR
      </button>
      {result && <ResultDisplay result={`APR: ${result.toFixed(2)}%`} />}

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

export default APRLoanGrid;
