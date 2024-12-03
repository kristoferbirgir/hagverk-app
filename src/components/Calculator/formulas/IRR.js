import React, { useState } from "react";
import ResultDisplay from "../../Shared/ResultDisplay";

const IRR = ({ formula }) => {
  const [cashFlowInputs, setCashFlowInputs] = useState([{ amount: "", year: "" }]);
  const [result, setResult] = useState(null);

  const handleAddCashFlow = () => {
    setCashFlowInputs([...cashFlowInputs, { amount: "", year: "" }]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCashFlows = [...cashFlowInputs];
    updatedCashFlows[index][name] = parseFloat(value) || "";
    setCashFlowInputs(updatedCashFlows);
  };

  const calculateIRR = () => {
    try {
      const result = formula.calculate({ cashFlows: cashFlowInputs });
      setResult(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>{formula.description}</h2>
      <div>
        <h4>Cash Flows</h4>
        {cashFlowInputs.map((cashFlow, index) => (
          <div key={index}>
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={cashFlow.amount || ""}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter amount"
            />
            <label>Year:</label>
            <input
              type="number"
              name="year"
              value={cashFlow.year || ""}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter year"
            />
          </div>
        ))}
        <button onClick={handleAddCashFlow}>Add Another Cash Flow</button>
      </div>
      <button onClick={calculateIRR}>Calculate IRR</button>
      {result !== null && <ResultDisplay result={result} label="Internal Rate of Return (%)" />}
    </div>
  );
};

export default IRR;
