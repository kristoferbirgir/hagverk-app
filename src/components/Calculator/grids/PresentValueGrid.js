import React, { useState } from "react";
import ResultDisplay from "../../Calculator/ResultDisplay";

const PresentValueGrid = ({ formula }) => {
  const [inputs, setInputs] = useState({ futureValue: "", interestRate: "", time: "" });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value === "" ? "" : parseFloat(value) }));
  };

  const calculateResult = () => {
    try {
      const result = formula.calculate(inputs);
      setResult(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h3>{formula.description}</h3>
      <table>
        <thead>
          <tr>
            <th>Future Value (FV)</th>
            <th>Interest Rate (%)</th>
            <th>Time (years)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="number"
                name="futureValue"
                value={inputs.futureValue || ""}
                onChange={handleInputChange}
                placeholder="Enter FV"
              />
            </td>
            <td>
              <input
                type="number"
                name="interestRate"
                value={inputs.interestRate || ""}
                onChange={handleInputChange}
                placeholder="Enter %"
              />
            </td>
            <td>
              <input
                type="number"
                name="time"
                value={inputs.time || ""}
                onChange={handleInputChange}
                placeholder="Enter years"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={calculateResult}>Calculate</button>
      {result !== null && <ResultDisplay result={result} />}
    </div>
  );
};

export default PresentValueGrid;
