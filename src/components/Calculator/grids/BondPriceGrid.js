import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const BondPriceGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    faceValue: "",
    couponRate: "",
    yields: [{ year: 1, rate: "" }], // Dynamic list for variable yields
    yearsToMaturity: "",
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === "yields") {
      const updatedYields = [...inputs.yields];
      updatedYields[index].rate = parseFloat(value) || "";
      setInputs((prev) => ({ ...prev, yields: updatedYields }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
    }
  };

  const addYear = () => {
    setInputs((prev) => ({
      ...prev,
      yields: [...prev.yields, { year: prev.yields.length + 1, rate: "" }],
    }));
  };

  const calculateBondPrice = () => {
    try {
      const { faceValue, couponRate, yields, yearsToMaturity } = inputs;

      const yieldRates = yields.map((yieldItem) => yieldItem.rate);
      const result = formula.calculate({
        faceValue,
        couponRate,
        yields: yieldRates,
        yearsToMaturity,
      });

      setResult({
        bondPrice: result.toFixed(2),
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const examples = [
    {
      description:
        "Skuldabréf á markaði með nafnvexti 15%, nafnverð 100 kr., og ávöxtunarkröfur árin [13%, 14%, 15%, 16%] í 4 ár. Reiknið markaðsverðið.",
      inputs: {
        faceValue: 100,
        couponRate: 15,
        yields: [
          { year: 1, rate: 13 },
          { year: 2, rate: 14 },
          { year: 3, rate: 15 },
          { year: 4, rate: 16 },
        ],
        yearsToMaturity: 4,
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

      {/* Input Fields */}
      <div className={styles["grid-row"]}>
        <label className={styles["grid-label"]}>Face Value (Nafnverð):</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="faceValue"
          value={inputs.faceValue || ""}
          onChange={handleInputChange}
          placeholder="Enter face value"
        />
      </div>
      <div className={styles["grid-row"]}>
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
      <div className={styles["grid-section"]}>
        <h4>Yields (Ávöxtunarkröfur):</h4>
        {inputs.yields.map((item, index) => (
          <div className={styles["grid-row"]} key={index}>
            <label className={styles["grid-label"]}>Year {item.year}:</label>
            <input
              type="number"
              className={styles["grid-input"]}
              name="yields"
              value={item.rate || ""}
              onChange={(e) => handleInputChange(e, index)}
              placeholder={`Yield for year ${item.year}`}
            />
          </div>
        ))}
        <button className={styles["grid-button"]} onClick={addYear}>
          Add Year
        </button>
      </div>
      <div className={styles["grid-row"]}>
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

      <button className={styles["grid-button"]} onClick={calculateBondPrice}>
        Calculate Bond Price
      </button>

      {result && (
        <ResultDisplay result={`Bond Price: ${result.bondPrice} kr.`} />
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

export default BondPriceGrid;
