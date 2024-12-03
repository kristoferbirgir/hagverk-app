import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";

const PeriodicCompoundingGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    presentValue: "",
    annualInterestRate: "",
    compoundingPeriods: "",
    timeInYears: "",
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || "",
    }));
  };

  const calculatePeriodicCompounding = () => {
    try {
      const result = formula.calculate(inputs);
      setResult(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="formula-container">
      <h3>{formula.description}</h3>
      {formula.variables.map((variable) => (
        <div key={variable}>
          <label>{variable}:</label>
          <input
            type="number"
            name={variable}
            value={inputs[variable] || ""}
            onChange={handleInputChange}
            placeholder={`Enter ${variable}`}
          />
        </div>
      ))}
      <button onClick={calculatePeriodicCompounding}>Calculate</button>
      {result !== null && <ResultDisplay result={result} />}
    </div>
  );
};

export default PeriodicCompoundingGrid;