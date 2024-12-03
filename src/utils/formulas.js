export const formulas = {
    presentValue: {
      description: "Calculate Present Value",
      variables: ["futureValue", "interestRate", "time"],
      calculate: ({ futureValue, interestRate, time }) => {
        return futureValue / Math.pow(1 + interestRate / 100, time);
      },
    },
    futureValue: {
      description: "Calculate Future Value",
      variables: ["presentValue", "interestRate", "time"],
      calculate: ({ presentValue, interestRate, time }) => {
        return presentValue * Math.pow(1 + interestRate / 100, time);
      },
    },
    interestRate: {
      description: "Calculate Interest Rate",
      variables: ["presentValue", "futureValue", "time"],
      calculate: ({ presentValue, futureValue, time }) => {
          return (Math.pow(futureValue / presentValue, 1 / time) - 1) * 100;
      },
    },
    time: {
      description: "Calculate Time",
      variables: ["presentValue", "futureValue", "interestRate"],
      calculate: ({ presentValue, futureValue, interestRate }) => {
        return Math.log(futureValue / presentValue) / Math.log(1 + interestRate / 100);
      },
    },
    presentValueMultipleCashFlows: {
      description: "Calculate Present Value with Multiple Withdrawals",
      variables: ["cashFlows", "interestRate"],
      calculate: ({ cashFlows, interestRate }) => {
        // Sum up the present value of each cash flow
        return cashFlows.reduce((totalPV, { amount, year }) => {
          const pv = amount / Math.pow(1 + interestRate / 100, year);
          return totalPV + pv;
        }, 0);
      },
    },
    futureValueWithFlatInterest: {
        description: "Calculate Future Value with Flat Interest",
        variables: ["presentValue", "annualInterestRate", "years"],
        calculate: ({ presentValue, annualInterestRate, years }) => {
          const rate = annualInterestRate / 100; // Convert percentage to decimal
          return presentValue + (presentValue * rate * years);
        },
      },
  };
  