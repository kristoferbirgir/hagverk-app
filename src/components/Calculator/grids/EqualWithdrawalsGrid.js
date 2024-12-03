import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";

const EqualWithdrawalsGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({
    presentValue: "",
    annualInterestRate: "",
    startYear: "",
    withdrawalYears: [],
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "withdrawalYears" ? value.split(",").map(Number) : parseFloat(value) || "",
    }));
  };

  const calculateEqualWithdrawals = () => {
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
      <div>
        <label>Present Value:</label>
        <input
          type="number"
          name="presentValue"
          value={inputs.presentValue || ""}
          onChange={handleInputChange}
          placeholder="Enter present value"
        />
      </div>
      <div>
        <label>Annual Interest Rate (%):</label>
        <input
          type="number"
          name="annualInterestRate"
          value={inputs.annualInterestRate || ""}
          onChange={handleInputChange}
          placeholder="Enter annual interest rate"
        />
      </div>
      <div>
        <label>Starting Year (Accumulation Period):</label>
        <input
          type="number"
          name="startYear"
          value={inputs.startYear || ""}
          onChange={handleInputChange}
          placeholder="Enter years before withdrawal starts"
        />
      </div>
      <div>
        <label>Withdrawal Years (e.g., 6,7,8):</label>
        <input
          type="text"
          name="withdrawalYears"
          value={inputs.withdrawalYears.join(",") || ""}
          onChange={handleInputChange}
          placeholder="Enter years separated by commas"
        />
      </div>
      <button onClick={calculateEqualWithdrawals}>Calculate</button>
      {result !== null && <ResultDisplay result={result} />}
    </div>
  );
};

export default EqualWithdrawalsGrid;
