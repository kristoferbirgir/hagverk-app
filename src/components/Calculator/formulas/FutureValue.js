import React from "react";
import FormulaGrid from "../grids/FormulaGrid";
import { formulas } from "../../../utils/formulas";
import styles from "./Formula.module.css";

const FutureValue = () => {
  return (
    <div className={styles["formula-container"]}>
      <FormulaGrid formula={formulas.futureValue} />
    </div>
  );
};

export default FutureValue;
