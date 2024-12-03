import React from "react";

const ResultDisplay = ({ result }) => {
  return (
    <div>
      <h3>Calculation Result</h3>
      {typeof result === "string" ? (
        <p>{result}</p>
      ) : (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
};

export default ResultDisplay;
