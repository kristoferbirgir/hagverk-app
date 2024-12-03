import React from "react";
import FormulaGrid from "../grids/FormulaGrid";
import { formulas } from "../../../utils/formulas";
import styles from "./Formula.module.css";

const PresentValue = () => {
  return (
    <div className={styles["formula-container"]}>
      <FormulaGrid formula={formulas.presentValue} />
    </div>
  );
};

export default PresentValue;
