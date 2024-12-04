import React from "react";
import FormulaGrid from "../grids/FormulaGrid";
import formulas from "../../../utils/formulas";


const InterestRate = () => {
  const interestRateFormula = formulas.interestRate;

  return (
    <div>
      <h2>Interest Rate (r) Calculator</h2>
      <p>Calculate the interest rate based on present value, future value, and time.</p>
      <FormulaGrid formula={interestRateFormula} />
    </div>
  );
};

export default InterestRate;
