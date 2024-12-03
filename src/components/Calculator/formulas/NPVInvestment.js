import React from "react";
import NPVGrid from "../grids/NPVGrid";
import formulas from "../../../utils/formulas";


const NPVInvestment = () => {
  const npvFormula = formulas.npv; // Reference the NPV formula from formulas.js

  return (
    <div>
      <h2>Net Present Value (NPV) Calculator</h2>
      <p>Calculate the NPV of an investment by entering cash flows and the discount rate.</p>
      <NPVGrid formula={npvFormula} />
    </div>
  );
};

export default NPVInvestment;
