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
      futureValueWithPeriodicCompounding: {
        description: "Calculate Future Value with Periodic Compounding",
        variables: ["presentValue", "annualInterestRate", "compoundingPeriods", "timeInYears"],
        calculate: ({ presentValue, annualInterestRate, compoundingPeriods, timeInYears }) => {
          const ratePerPeriod = annualInterestRate / 100 / compoundingPeriods; // Convert annual rate to periodic rate
          const totalPeriods = compoundingPeriods * timeInYears; // Total compounding periods
          return presentValue * Math.pow(1 + ratePerPeriod, totalPeriods);
        },
      },
      futureValueCompoundInterest: {
        description: "Future Value with Compound Interest",
        variables: ["presentValue", "annualInterestRate", "timeInYears"],
        calculate: ({ presentValue, annualInterestRate, timeInYears }) => {
          const rate = annualInterestRate / 100; // Convert percentage to decimal
          return presentValue * Math.pow(1 + rate, timeInYears);
        },
      },
      equalWithdrawals: {
        description: "Equal Annual Withdrawals (with Dynamic Years)",
        variables: ["presentValue", "annualInterestRate", "startYear", "withdrawalYears"],
        calculate: ({ presentValue, annualInterestRate, startYear, withdrawalYears }) => {
          const rate = annualInterestRate / 100; // Convert percentage to decimal
      
          // Future Value after the accumulation period (startYear)
          const futureValue = presentValue * Math.pow(1 + rate, startYear);
      
          // Validate withdrawalYears: all must be greater than startYear
          const validYears = withdrawalYears.filter((year) => year > startYear);
          if (validYears.length !== withdrawalYears.length) {
            throw new Error("All withdrawal years must be greater than the starting year.");
          }
      
          // Calculate the total present value of withdrawals
          const totalPV = validYears.reduce((total, year) => {
            const yearIndex = year - startYear; // Number of years from the future value
            total += Math.pow(1 + rate, -yearIndex); // Discount factor for this year
            return total;
          }, 0);
      
          // Calculate annual withdrawal amount
          const annualWithdrawal = futureValue / totalPV;
      
          return annualWithdrawal;
        },
      },    
  };
  