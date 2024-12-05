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
        <option value="loanRepayment">Endurgreiðsla Vaxtagreiðsluláns</option>
        <option value="futureValueOfCashFlows">Framtíðarvirði Greiðsluflæðis</option>
        <option value="equalPrincipalBondInterest">Equal Principal Bond Interest</option>
        <option value="equalPaymentLoan">Equal Payment Loan</option>
        <option value="equalPaymentBond">Equal Payment Bond</option>
        <option value="equalPrincipalLoanNPV">Equal Principal Loan NPV</option>
        <option value="equalPaymentLoanNPV">Equal Payment Loan NPV</option>
        <option value="bondPrice">Markaðsverð Skuldabréfs</option>
        <option value="presentValueLoan">Núvirði á Jafngreiðsluláni</option>
        <option value="realReturn">Raunávöxtun</option>
        <option value="aprLoan">Árleg Hlutfallstala Kostnaðar (APR)</option>
        <option value="semiAnnualBond">Semi-Annual Bond Price and Duration</option>
        <option value="bondCashFlowWithDuration"> Bond Cash Flow with Average Duration</option>
        <option value="bondYieldAndDuration">Ávöxtunarkrafa Vaxtagreiðslubréfs og Meðaltími</option>
        <option value="annualizedReturn">Ársávöxtun</option>
        <option value="rekstrarreikning">Rekstrarreikningur</option>
        <option value="balanceSheet">Efnahagsreikningur</option>
        <option value="capm">Vænt Ávöxtun (CAPM)</option>
        <option value="riskFreeRate">Áhættulausir Vextir (CAPM)</option>
        <option value="wacc">Weighted Average Cost of Capital (WACC)</option>
        <option value="forwardRate">Framvirkir Vextir</option>
        <option value="fcffValuation">FCFF Heildarvirði</option>
        <option value="cashFlowFromOperations">Handbært Fé frá Rekstri</option>
        <option value="peComparison">V/H Kennitölusamanburður</option>
        <option value="portfolioReturn">Vænt Ávöxtun Safns</option>
      </select>
    </div>
  );
};

export default FormulaSelector;
