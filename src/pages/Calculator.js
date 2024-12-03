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
    startYear:"",
    withdrawalYears: [],
  });
  const [cashFlowInputs, setCashFlowInputs] = useState([{ amount: "", year: "" }]);
  const [withdrawalInputs, setWithdrawalInputs] = useState([{ year: "" }]); 
  const [result, setResult] = useState(null);

  const handleInputChange = (e, index = null, isWithdrawal = false) => {
    const { name, value } = e.target;

    if (name === "cashFlows") {
      const updatedCashFlows = [...cashFlowInputs];
      updatedCashFlows[index][e.target.dataset.field] = parseFloat(value) || "";
      setCashFlowInputs(updatedCashFlows);
    } else if (isWithdrawal) {
        const updatedWithdrawals = [...withdrawalInputs];
        updatedWithdrawals[index].year = parseInt(value) || ""; // Update withdrawal year
        setWithdrawalInputs(updatedWithdrawals);
    } else {
      setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
    }
  };

  const handleAddCashFlow = () => {
    setCashFlowInputs([...cashFlowInputs, { amount: "", year: "" }]);
  };
  const handleAddWithdrawalYear = () => {
    setWithdrawalInputs([...withdrawalInputs, { year: "" }]);
  };

  const handleRemoveWithdrawalYear = (index) => {
    const updatedWithdrawals = [...withdrawalInputs];
    updatedWithdrawals.splice(index, 1); // Remove the specific year
    setWithdrawalInputs(updatedWithdrawals);
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
  
    if (selectedFormula === "equalWithdrawals") {
      const { presentValue, annualInterestRate, startYear } = inputs;
      const withdrawalYears = withdrawalInputs.map((wi) => wi.year).filter(Boolean);

      if (!presentValue || !annualInterestRate || !startYear || withdrawalYears.length === 0) {
        alert("Please fill in all required fields: Present Value, Annual Interest Rate, Starting Year, and Withdrawal Years.");
        return;
      }

      const params = {
        presentValue,
        annualInterestRate,
        startYear: parseInt(startYear),
        withdrawalYears,
      };

      setResult(formula.calculate(params));
      return;
    }

    // Handle other formulas
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
        <label>Veldu Formúlu:</label>
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
              startYear: "",
              withdrawalYears: [],
            });
            setCashFlowInputs([{ amount: "", year: "" }]);
            setWithdrawalInputs([{ year: "" }]); // Reset withdrawals
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
      {selectedFormula === "equalWithdrawals" && (
        <>
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
            <label>Starting Year:</label>
            <input
              type="number"
              name="startYear"
              value={inputs.startYear || ""}
              onChange={handleInputChange}
              placeholder="Enter starting year"
            />
          </div>
          <div>
            <h3>Withdrawal Years</h3>
            {withdrawalInputs.map((withdrawal, index) => (
              <div key={index}>
                <input
                  type="number"
                  value={withdrawal.year || ""}
                  onChange={(e) => handleInputChange(e, index, true)}
                  placeholder={`Year ${index + 1}`}
                />
                <button onClick={() => handleRemoveWithdrawalYear(index)}>Remove</button>
              </div>
            ))}
            <button onClick={handleAddWithdrawalYear}>Add Withdrawal Year</button>
          </div>
        </>
      )}


      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && (
        <div className="result-container">
          <h3>Útkoma: {result.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Calculator;
