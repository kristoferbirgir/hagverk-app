import React from "react";
import styles from "./ResultDisplay.module.css"; // Optional: Add custom styles

const ResultDisplay = ({ result }) => {
  if (!result) {
    return null; // Don't render anything if there is no result
  }

  return (
    <div className={styles["result-container"] || ""}>
      <h3 className={styles["result-header"] || ""}>Calculation Result</h3>
      {typeof result === "string" ? (
        <p className={styles["result-text"] || ""}>{result}</p>
      ) : (
        <pre className={styles["result-preformatted"] || ""}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ResultDisplay;
