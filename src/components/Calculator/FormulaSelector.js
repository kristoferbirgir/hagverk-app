import React from "react";

const FormulaSelector = ({ selectedFormula, onSelect }) => {
  return (
    <div>
      <label>Choose a formula:</label>
      <select value={selectedFormula} onChange={(e) => onSelect(e.target.value)}>
        <option value="presentValue">Present Value</option>
        <option value="futureValue">Future Value</option>
        <option value="netPresentValue">Net Present Value (NPV)</option>
        <option value="interestRate">Interest Rate</option> 
        <option value="time">Time</option> 
        <option value="irr">Internal Rate of Return (IRR)</option>
        <option value="flatInterest">Future Value with Flat Interest</option>
        <option value="futureValueWithPeriodicCompounding">Future Value with Periodic Compounding</option>
        <option value="futureValueCompoundInterest">Future Value with Compound Interest</option>
        <option value="equalWithdrawalsCompoundInterest">Equal Annual Withdrawals (Compound Interest)</option>
        <option value="effectiveInterestRate">Effective Interest Rate</option>
        <option value="loanRepayment">Loan Repayment (Interest-Only Loan)</option>
        <option value="futureValueOfCashFlows">Future Value of Cash Flows</option>
        <option value="equalPrincipalBondInterest">Total Interest on Equal Principal Bond</option>
        <option value="equalPaymentLoan">Monthly Payment for Amortized Loan</option>

        {/* Add more formulas here */}
      </select>
    </div>
  );
};

export default FormulaSelector;
