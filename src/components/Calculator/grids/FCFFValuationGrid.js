import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const FCFFValuationGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    fcff: [{ year: 1, value: "" }], // Dynamic list for FCFF values
    debt: "",
    equity: "",
    costOfEquity: "",
    interestRate: "",
    taxRate: "",
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === "fcff") {
      const updatedFcff = [...inputs.fcff];
      updatedFcff[index].value = parseFloat(value) || "";
      setInputs((prev) => ({ ...prev, fcff: updatedFcff }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
    }
  };

  const addYear = () => {
    setInputs((prev) => ({
      ...prev,
      fcff: [...prev.fcff, { year: prev.fcff.length + 1, value: "" }],
    }));
  };

  const calculateValuation = () => {
    try {
      const { fcff, debt, equity, costOfEquity, interestRate, taxRate } = inputs;

      const result = formula.calculate({
        fcff,
        debt,
        equity,
        costOfEquity,
        interestRate,
        taxRate,
      });

      setResult({
        discountedFCFF: result.discountedFCFF.toFixed(2),
        wacc: result.wacc.toFixed(2),
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const examples = [
    {
      description:
        "Fyrirtæki með 4 ára rekstrarleyfi, skuldum upp á 10.000.000 kr., eigin fé 5.000.000 kr., ávöxtunarkröfu á eigið fé 13%, vexti á skuldum 6% og skattprósentu 18%. FCFF næstu 4 árin eru áætluð sem 4.000.000 kr., 5.000.000 kr., 6.000.000 kr., og 7.000.000 kr.",
      inputs: {
        fcff: [
          { year: 1, value: 4000000 },
          { year: 2, value: 5000000 },
          { year: 3, value: 6000000 },
          { year: 4, value: 7000000 },
        ],
        debt: 10000000,
        equity: 5000000,
        costOfEquity: 13,
        interestRate: 6,
        taxRate: 18,
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

      {/* FCFF Inputs */}
      <div className={styles["grid-section"]}>
        <h4>FCFF (Frjálst sjóðsstreymi):</h4>
        {inputs.fcff.map((item, index) => (
          <div className={styles["grid-row"]} key={index}>
            <label className={styles["grid-label"]}>Year {item.year}:</label>
            <input
              type="number"
              className={styles["grid-input"]}
              name="fcff"
              value={item.value || ""}
              onChange={(e) => handleInputChange(e, index)}
              placeholder={`Enter FCFF for year ${item.year}`}
            />
          </div>
        ))}
        <button className={styles["grid-button"]} onClick={addYear}>
          Add Year
        </button>
      </div>

      {/* Financial Inputs */}
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Debt (Skuldir):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="debt"
          value={inputs.debt || ""}
          onChange={handleInputChange}
          placeholder="Enter debt amount"
        />
      </div>
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
        <label className={styles["grid-label"]}>Cost of Equity (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="costOfEquity"
          value={inputs.costOfEquity || ""}
          onChange={handleInputChange}
          placeholder="Enter cost of equity"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Interest Rate on Debt (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="interestRate"
          value={inputs.interestRate || ""}
          onChange={handleInputChange}
          placeholder="Enter interest rate"
        />
      </div>
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Tax Rate (%):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="taxRate"
          value={inputs.taxRate || ""}
          onChange={handleInputChange}
          placeholder="Enter tax rate"
        />
      </div>

      <button className={styles["grid-button"]} onClick={calculateValuation}>
        Calculate Valuation
      </button>

      {result && (
        <ResultDisplay
          result={`Discounted FCFF: ${result.discountedFCFF} kr. | WACC: ${result.wacc}%`}
        />
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

export default FCFFValuationGrid;
