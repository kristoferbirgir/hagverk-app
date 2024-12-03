import React, { useState } from "react";
import { formulas } from "../utils/formulas";
import "./Calculator.css";

const Calculator = () => {
  const [selectedFormula, setSelectedFormula] = useState("presentValueMultipleCashFlows");
  const [inputs, setInputs] = useState({
    cashFlows: [],
    interestRate: "",
    presentValue: "",
    annualInterestRate: "",
    years: "",
  });
  const [cashFlowInputs, setCashFlowInputs] = useState([{ amount: "", year: "" }]);
  const [result, setResult] = useState(null);

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === "cashFlows") {
      const updatedCashFlows = [...cashFlowInputs];
      updatedCashFlows[index][e.target.dataset.field] = parseFloat(value) || "";
      setCashFlowInputs(updatedCashFlows);
    } else {
      setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
    }
  };

  const handleAddCashFlow = () => {
    setCashFlowInputs([...cashFlowInputs, { amount: "", year: "" }]);
  };

  const handleCalculate = () => {
    const formula = formulas[selectedFormula];

    // Handle cash flows for presentValueMultipleCashFlows
    if (selectedFormula === "presentValueMultipleCashFlows") {
      const cashFlows = cashFlowInputs.filter((cf) => cf.amount && cf.year);
      if (!inputs.interestRate || cashFlows.length === 0) {
        alert("Please fill in all required fields for cash flows.");
        return;
      }
      const params = { cashFlows, interestRate: inputs.interestRate };
      setResult(formula.calculate(params));
      return;
    }

    // Handle other formulas with single calculations
    const params = { ...inputs };
    const missingFields = formula.variables.filter((variable) => !params[variable]);
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }
    setResult(formula.calculate(params));
  };

  return (
    <div className="calculator-container">
      <h2>{formulas[selectedFormula].description}</h2>
      <div>
        <label>Select Formula:</label>
        <select
          value={selectedFormula}
          onChange={(e) => {
            setSelectedFormula(e.target.value);
            setInputs({
              cashFlows: [],
              interestRate: "",
              presentValue: "",
              annualInterestRate: "",
              years: "",
            });
            setCashFlowInputs([{ amount: "", year: "" }]);
            setResult(null);
          }}
        >
          {Object.keys(formulas).map((key) => (
            <option key={key} value={key}>
              {formulas[key].description}
            </option>
          ))}
        </select>
      </div>

      {/* Render input fields dynamically based on the selected formula */}
      {selectedFormula === "presentValueMultipleCashFlows" ? (
        <>
          <div>
            <label>Interest Rate (%):</label>
            <input
              type="number"
              name="interestRate"
              value={inputs.interestRate || ""}
              onChange={handleInputChange}
              placeholder="Enter interest rate"
            />
          </div>
          <div>
            <h3>Cash Flows</h3>
            {cashFlowInputs.map((cashFlow, index) => (
              <div key={index}>
                <label>Amount:</label>
                <input
                  type="number"
                  name="cashFlows"
                  data-field="amount"
                  value={cashFlow.amount || ""}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Enter amount"
                />
                <label>Year:</label>
                <input
                  type="number"
                  name="cashFlows"
                  data-field="year"
                  value={cashFlow.year || ""}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Enter year"
                />
              </div>
            ))}
            <button onClick={handleAddCashFlow}>Add Another Cash Flow</button>
          </div>
        </>
      ) : (
        <>
          {formulas[selectedFormula].variables.map((variable) => (
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
        </>
      )}

      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && (
        <div className="result-container">
          <h3>Result: {result.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Calculator;
