import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";
import styles from "./grids.module.css";

const ForwardRateGrid = ({ formula }) => {
  const [years, setYears] = useState([
    { year: 1, rate: 2.5 },
    { year: 2, rate: 3.5 },
    { year: 3, rate: 6.0 },
    { year: 4, rate: 7.5 },
  ]);
  const [selectedYears, setSelectedYears] = useState({ startYear: 1, endYear: 3 });
  const [result, setResult] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleRateChange = (index, value) => {
    const updatedYears = [...years];
    updatedYears[index].rate = parseFloat(value) || "";
    setYears(updatedYears);
  };

  const addYear = () => {
    setYears([...years, { year: years.length + 1, rate: "" }]);
  };

  const calculateForwardRate = () => {
    try {
      const { startYear, endYear } = selectedYears;
      if (startYear >= endYear) {
        throw new Error("End year must be greater than start year.");
      }
      const inputs = {
        startRate: years[startYear - 1]?.rate,
        endRate: years[endYear - 1]?.rate,
        startYear,
        endYear,
      };
      const result = formula.calculate(inputs);
      setResult(result);
    } catch (error) {
      alert(error.message);
    }
  };

  const examples = [
    {
      description:
        "Eftirfarandi eingreiðsluvextir eru gefnir:\n\nÁr\tVextir\n1\t2,50%\n2\t3,50%\n3\t6,00%\n4\t7,50%\n\nHverjir eru 2ja ára framvirkir vextir eftir 1 ár?",
      years: [
        { year: 1, rate: 2.5 },
        { year: 2, rate: 3.5 },
        { year: 3, rate: 6.0 },
        { year: 4, rate: 7.5 },
      ],
      selectedYears: { startYear: 1, endYear: 3 },
    },
  ];

  const applyExample = (example) => {
    setYears(example.years);
    setSelectedYears(example.selectedYears);
    setResult(null);
  };

  return (
    <div className={styles["grid-container"]}>
      <h3 className={styles["grid-header"]}>{formula.description}</h3>
      <div className={styles["grid-section"]}>
        <h4>Spot Rates</h4>
        {years.map((year, index) => (
          <div className={styles["grid-row"]} key={index}>
            <label className={styles["grid-label"]}>Year {year.year} Rate (%):</label>
            <input
              type="number"
              className={styles["grid-input"]}
              value={year.rate || ""}
              onChange={(e) => handleRateChange(index, e.target.value)}
              placeholder={`Enter rate for year ${year.year}`}
            />
          </div>
        ))}
        <button className={styles["grid-button"]} onClick={addYear}>
          Add Year
        </button>
      </div>

      <div className={styles["grid-section"]}>
        <h4>Forward Rate Calculation</h4>
        <div className={styles["grid-row"]}>
          <label className={styles["grid-label"]}>Start Year:</label>
          <input
            type="number"
            className={styles["grid-input"]}
            value={selectedYears.startYear}
            onChange={(e) =>
              setSelectedYears((prev) => ({
                ...prev,
                startYear: parseInt(e.target.value) || 1,
              }))
            }
            placeholder="Enter start year"
          />
        </div>
        <div className={styles["grid-row"]}>
          <label className={styles["grid-label"]}>End Year:</label>
          <input
            type="number"
            className={styles["grid-input"]}
            value={selectedYears.endYear}
            onChange={(e) =>
              setSelectedYears((prev) => ({
                ...prev,
                endYear: parseInt(e.target.value) || 2,
              }))
            }
            placeholder="Enter end year"
          />
        </div>
        <button className={styles["grid-button"]} onClick={calculateForwardRate}>
          Calculate Forward Rate
        </button>
      </div>

      {result !== null && (
        <ResultDisplay
          result={`Forward Rate: ${
            typeof result.forwardRate === "number"
              ? result.forwardRate.toFixed(2) + "%"
              : "N/A"
          }`}
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
                  onClick={() => applyExample(example)}
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

export default ForwardRateGrid;
