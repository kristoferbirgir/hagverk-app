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
        <option value="loanRepayment">Loan Repayment</option>
        <option value="futureValueOfCashFlows">Future Value of Cash Flows</option>
        <option value="equalPrincipalBondInterest">Equal Principal Bond Interest</option>
        <option value="equalPaymentLoan">Equal Payment Loan</option>
        <option value="equalPaymentBond">Equal Payment Bond</option>
        <option value="equalPrincipalLoanNPV">Equal Principal Loan NPV</option>
        <option value="equalPaymentLoanNPV">Equal Payment Loan NPV</option>
        <option value="bondPrice">Bond Price</option>
        <option value="presentValueLoan">Present Value Loan</option>
        <option value="realReturn">Real Return</option> 
        <option value="aprLoan">Annual Percentage Rate (APR)</option>

      </select>
    </div>
  );
};

export default FormulaSelector;
