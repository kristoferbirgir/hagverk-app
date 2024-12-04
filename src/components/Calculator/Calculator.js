import React, { useState } from "react";
import "./Calculator.css";
import FormulaSelector from "./FormulaSelector";
import PresentValue from "./formulas/PresentValue";
import FutureValue from "./formulas/FutureValue";
import NPVGrid from "./grids/NPVGrid";
import InterestRate from "./formulas/InterestRate";
import Time from "./formulas/Time";
import IRR from "./formulas/IRR";
import FlatInterestGrid from "./grids/FlatInterestGrid";
import PeriodicCompoundingGrid from "./grids/PeriodicCompoundingGrid"; // Import new grid
import CompoundInterestGrid from "./grids/CompoundInterestGrid";
import EqualWithdrawalsGrid from "./grids/EqualWithdrawalsGrid";
import EffectiveInterestRate from "./grids/EffectiveInterestRate";
import LoanRepaymentGrid from "./grids/LoanRepaymentGrid";
import FutureValueOfCashFlowsGrid from "./grids/FutureValueOfCashFlowsGrid";
import EqualPrincipalBondInterestGrid from "./grids/EqualPrincipalBondInterestGrid";
import EqualPaymentLoanGrid from "./grids/EqualPaymentLoanGrid";
import EqualPaymentBondGrid from "./grids/EqualPaymentBondGrid";
import EqualPrincipalLoanNPVGrid from "./grids/EqualPrincipalLoanGrid";
import EqualPaymentLoanNPVGrid from "./grids/EqualPaymentLoanNPVGrid";
import BondPriceGrid from "./grids/BondPriceGrid";
import PresentValueLoanGrid from "./grids/PresentValueLoanGrid";
import RealReturnGrid from "./grids/RealReturnGrid";
import APRLoanGrid from "./grids/APRLoanGrid";
import SemiAnnualBondGrid from "./grids/SemiAnnualBondGrid.js";
import BondCashFlowDurationGrid from "./grids/BondCashFlowDurationGrid";
import BondYieldAndDurationGrid from "./grids/BondYieldAndDurationGrid.js";
import AnnualizedReturnGrid from "./grids/AnnualizedReturnGrid.js";
import RekstrarreikningGrid from "./grids/RekstrarreikningGrid.js";
import CAPMGrid from "./grids/CAPMGrid.js";
import WACCGrid from "./grids/WACCGrid.js";
import ForwardRateGrid from "./grids/ForwardRateGrid.js";
import RiskFreeRateGrid from "./grids/RiskFreeRateGrid.js";
import BalanceSheetGrid from "./grids/BalanceSheetGrid.js";
import FCFFValuationGrid from "./grids/FCFFValuationGrid.js";
import CashFlowGrid from "./grids/CashFlowGrid.js";
import PEComparisonGrid from "./grids/PEComparisonGrid.js";
import PortfolioReturnGrid from "./grids/PortfolioRetrunGrid.js";
import formulas from "../../utils/formulas";

const Calculator = () => {
  const [selectedFormula, setSelectedFormula] = useState("presentValue");

  const renderFormula = () => {
    switch (selectedFormula) {
      case "presentValue":
        return <PresentValue />;
      case "futureValue":
        return <FutureValue />;
        case "netPresentValue":
        return <NPVGrid formula={formulas.netPresentValue} />;
      case "interestRate":
        return <InterestRate />;
      case "time":
        return <Time />;
      case "irr":
        return <IRR formula={formulas.irr} />;
      case "flatInterest":
        return <FlatInterestGrid formula={formulas.flatInterest} />;
      case "futureValueWithPeriodicCompounding":
        return <PeriodicCompoundingGrid formula={formulas.futureValueWithPeriodicCompounding} />; 
      default:
        return <div>Select a formula to begin.</div>;
      case "futureValueCompoundInterest":
      return <CompoundInterestGrid formula={formulas.futureValueCompoundInterest} />;
      case "equalWithdrawalsCompoundInterest":
      return <EqualWithdrawalsGrid formula={formulas.equalWithdrawalsCompoundInterest} />;
      case "effectiveInterestRate":
      return <EffectiveInterestRate formula={formulas.effectiveInterestRate} />;
      case "loanRepayment":
      return <LoanRepaymentGrid formula={formulas.loanRepayment} />;
      case "futureValueOfCashFlows":
      return <FutureValueOfCashFlowsGrid formula={formulas.futureValueOfCashFlows} />;
      case "equalPrincipalBondInterest":
      return <EqualPrincipalBondInterestGrid formula={formulas.equalPrincipalBondInterest} />;
      case "equalPaymentLoan":
      return <EqualPaymentLoanGrid formula={formulas.equalPaymentLoan} />;
      case "equalPaymentBond":
      return <EqualPaymentBondGrid formula={formulas.equalPaymentBond} />;
      case "equalPrincipalLoanNPV":
      return <EqualPrincipalLoanNPVGrid formula={formulas.equalPrincipalLoanNPV} />;
      case "equalPaymentLoanNPV":
      return <EqualPaymentLoanNPVGrid formula={formulas.equalPaymentLoanNPV} />;
      case "bondPrice":
      return <BondPriceGrid formula={formulas.bondPrice} />;
      case "presentValueLoan":
      return <PresentValueLoanGrid formula={formulas.presentValueLoan} />;
      case "realReturn":
      return <RealReturnGrid formula={formulas.realReturn} />;
      case "aprLoan": return <APRLoanGrid formula={formulas.aprLoan} />;
      case "semiAnnualBond":
      return <SemiAnnualBondGrid formula={formulas.semiAnnualBond} />;
      case "bondCashFlowWithDuration":
      return <BondCashFlowDurationGrid formula={formulas.bondCashFlowWithDuration} />;
      case "bondYieldAndDuration":
      return <BondYieldAndDurationGrid formula={formulas.bondYieldAndDuration} />;
      case "annualizedReturn":
      return <AnnualizedReturnGrid formula={formulas.annualizedReturn} />;
      case "rekstrarreikning":
      return <RekstrarreikningGrid formula={formulas.rekstrarreikning} />;
      case "capm":
      return <CAPMGrid formula={formulas.capm} />;
      case "wacc":
      return <WACCGrid formula={formulas.wacc} />;
      case "forwardRate":
      return <ForwardRateGrid formula={formulas.forwardRate} />;
      case "riskFreeRate":
      return <RiskFreeRateGrid formula={formulas.riskFreeRate} />;
      case "balanceSheet":
      return <BalanceSheetGrid />;
      case "fcffValuation":
      return <FCFFValuationGrid formula={formulas.fcffValuation} />;
      case "cashFlowFromOperations":
      return <CashFlowGrid formula={formulas.cashFlowFromOperations} />;
      case "peComparison":
      return <PEComparisonGrid formula={formulas.peComparison} />;
      case "portfolioReturn":
      return <PortfolioReturnGrid formula={formulas.portfolioReturn} />;

    
    }
  };

  return (
    <div className="calculator-container">
      <FormulaSelector selectedFormula={selectedFormula} onSelect={setSelectedFormula} />
      <div className="formula-output">{renderFormula()}</div>
    </div>
  );
};

export default Calculator;
