import React from "react";
import FormulaGrid from "../grids/FormulaGrid";
import formulas from "../../../utils/formulas";


const Time = () => {
  const timeFormula = formulas.time;

  return (
    <div>
      <h2>Time (t) Calculator</h2>
      <p>Calculate the time required to reach a future value given the present value and interest rate.</p>
      <FormulaGrid formula={timeFormula} />
    </div>
  );
};

export default Time;
