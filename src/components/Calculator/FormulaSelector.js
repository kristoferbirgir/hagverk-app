import React from "react";
import "./FormulaSelector.css";

const FormulaSelector = ({ selectedFormula, onSelect }) => {
  return (
    <div className="formula-selector">
      <label className="selector-label">Veldu Formúlu:</label>
      <select
        className="formula-dropdown"
        value={selectedFormula}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="presentValue">Núvirði</option>
        <option value="futureValue">Framtíðarvirði</option>
        <option value="netPresentValue">Hreint Núvirði (NPV)</option>
        <option value="interestRate">Vextir</option>
        <option value="time">Tími</option>
        <option value="irr">Innri Ávöxtun (IRR)</option>
        <option value="flatInterest">Framtíðarvirði með Flötum Vöxtum</option>
        <option value="futureValueWithPeriodicCompounding">Framtíðarvirði með Vaxtatímabilum</option>
        <option value="futureValueCompoundInterest">Framtíðarvirði með Veldisvöxtum</option>
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
        <option value="semiAnnualBond">Semi-Annual Bond Price and Duration</option>
        <option value="bondCashFlowWithDuration"> Bond Cash Flow with Average Duration</option>
        <option value="bondYieldAndDuration">Bond Yield and Average Duration</option>
        <option value="annualizedReturn">Annualized Return</option>
        <option value="rekstrarreikning">Rekstrarreikning Calculation</option>
        <option value="capm">Expected Return (CAPM)</option>
        <option value="wacc">Weighted Average Cost of Capital (WACC)</option>
        <option value="forwardRate">Forward Rate (1 to 2 Years)</option>

      </select>
    </div>
  );
};

export default FormulaSelector;
