import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const BondPriceGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    faceValue: "",
    couponRate: "",
    yearsToMaturity: "",
    yields: [{ year: 1, yield: "" }], // Array for multiple yields
  });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false); // Toggle for examples

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
  };

  const handleYearSelection = (selectedYear, newYield) => {
    const updatedYields = [...inputs.yields];
    for (let i = selectedYear - 1; i < inputs.yearsToMaturity; i++) {
      updatedYields[i] = { year: i + 1, yield: newYield };
    }
    setInputs((prev) => ({ ...prev, yields: updatedYields }));
  };

  const handleYearsToMaturityChange = (e) => {
    const years = parseInt(e.target.value) || 0;
    const updatedYields = Array.from({ length: years }, (_, i) => ({
      year: i + 1,
      yield: inputs.yields[i]?.yield || "",
    }));
    setInputs((prev) => ({ ...prev, yearsToMaturity: years, yields: updatedYields }));
  };

  const calculateBondPrice = () => {
    try {
      // Validate input
      if (!inputs.faceValue || !inputs.couponRate || !inputs.yields.length) {
        throw new Error("Please fill in all required fields.");
      }
      if (inputs.yields.length !== inputs.yearsToMaturity) {
        throw new Error("The number of yields must match the years to maturity.");
      }
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
        "Skuldabréf á markaði greiðir vexti einu sinni á ári (vaxtagreiðslubréf) og er til þriggja ára. Nafnverð bréfsins er 100 kr. Nafnvextir bréfsins eru 9%. Ef ávöxtunarkrafa til bréfsins er 7% hvert ætti markaðsverð þess að vera?",
      inputs: {
        faceValue: 100,
        couponRate: 9,
        yearsToMaturity: 3,
        yields: [
          { year: 1, yield: 7 },
          { year: 2, yield: 7 },
          { year: 3, yield: 7 },
        ],
      },
    },
    {
        description:
          "Skuldabréf á markaði greiðir vexti einu sinni á ári (vaxtagreiðslubréf) og er til þriggja ára. Nafnverð bréfsins er 100 kr. og nafnvextir bréfsins eru 15%. Ávöxtunarkrafa bréfsins við útgáfu er 15%. Eftir fyrstu vaxtagreiðslu er ávöxtunarkrafan 16%, hvert ætti markaðsverðið að vera þá?",
        inputs: {
          faceValue: 100,
          couponRate: 15,
          yearsToMaturity: 3,
          yields: [
            { year: 1, yield: 15 },
            { year: 2, yield: 16 },
            { year: 3, yield: 16 },
          ],
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
        <label className={styles["grid-label"]}>Years to Maturity:</label>
        <input
          type="number"
          className={styles["grid-input"]}
          name="yearsToMaturity"
          value={inputs.yearsToMaturity || ""}
          onChange={handleYearsToMaturityChange}
          placeholder="Enter years to maturity"
        />
      </div>
      <div>
        <h4>Ávöxtunarkrafa (Yields)</h4>
        {inputs.yields.map((yieldEntry, index) => (
          <div key={index} className={styles["grid-row"]}>
            <label className={styles["grid-label"]}>
              Yield for Year {yieldEntry.year} (%):
            </label>
            <input
              type="number"
              className={styles["grid-input"]}
              value={yieldEntry.yield || ""}
              onChange={(e) =>
                handleYearSelection(yieldEntry.year, parseFloat(e.target.value) || 0)
              }
              placeholder={`Enter yield for year ${yieldEntry.year}`}
            />
          </div>
        ))}
      </div>
      <button className={styles["grid-button"]} onClick={calculateBondPrice}>
        Calculate Bond Price
      </button>
      {result && <ResultDisplay result={`Market Price: ${result.toFixed(2)} ISK`} />}

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
