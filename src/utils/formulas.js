import { calculateNPV, calculateDerivative } from "./helpers";

export const formulas = {
    presentValue: {
      description: "Calculate Present Value (PV)",
      variables: ["futureValue", "interestRate", "time"],
      calculate: ({ futureValue, interestRate, time }) => {
        if (!futureValue || !interestRate || !time) {
          throw new Error("All fields (Future Value, Interest Rate, Time) must be filled.");
        }
        return futureValue / Math.pow(1 + interestRate / 100, time);
      },
    },
    futureValue: {
        description: "Calculate Future Value",
        variables: ["presentValue", "interestRate", "time"],
        calculate: ({ presentValue, interestRate, time }) => {
          if (!presentValue || !interestRate || !time) {
            throw new Error("Please fill in all fields.");
          }
          return presentValue * Math.pow(1 + interestRate / 100, time);
        },
      },
      netPresentValue: {
        description: "Calculate Net Present Value (NPV) with Costs",
        variables: ["cashFlows", "discountRate", "initialCost"],
        calculate: ({ cashFlows, discountRate, initialCost }) => {
          if (!cashFlows || cashFlows.length === 0 || !discountRate || initialCost === undefined) {
            throw new Error("Please provide all required inputs: Cash Flows, Discount Rate, and Initial Cost.");
          }
    
          const rate = discountRate / 100; // Convert percentage to decimal
    
          // Include the initial cost as the first cash flow (negative)
          const totalNPV = cashFlows.reduce((total, { revenue, cost, year }) => {
            if (revenue === undefined || cost === undefined || year === undefined) {
              throw new Error("Each cash flow must include revenue, cost, and year.");
            }
            const netCashFlow = revenue - cost; // Net cash flow for the year
            const pv = netCashFlow / Math.pow(1 + rate, year); // Present value
            return total + pv;
          }, -initialCost); // Start with the initial cost as a negative value
    
          return totalNPV;
        },
      },
      interestRate: {
        description: "Interest Rate (r)",
        variables: ["presentValue", "futureValue", "time"],
        calculate: ({ presentValue, futureValue, time }) => {
          if (!presentValue || !futureValue || !time) {
            throw new Error("Please provide Present Value, Future Value, and Time.");
          }
          if (presentValue <= 0 || futureValue <= 0 || time <= 0) {
            throw new Error("Values must be greater than zero.");
          }
          return Math.pow(futureValue / presentValue, 1 / time) - 1;
        },
      },
      time: {
        description: "Time (t)",
        variables: ["presentValue", "futureValue", "interestRate"],
        calculate: ({ presentValue, futureValue, interestRate }) => {
          if (!presentValue || !futureValue || !interestRate) {
            throw new Error("Please provide Present Value, Future Value, and Interest Rate.");
          }
          if (presentValue <= 0 || futureValue <= 0 || interestRate <= 0) {
            throw new Error("Values must be greater than zero.");
          }
          const rate = interestRate / 100; // Convert percentage to decimal
          return Math.log(futureValue / presentValue) / Math.log(1 + rate);
        },
      },
      irr: {
        description: "Internal Rate of Return (IRR)",
        variables: ["cashFlows"],
        calculate: ({ cashFlows }) => {
          if (!cashFlows || cashFlows.length === 0) {
            throw new Error("Please provide cash flows.");
          }
    
          const maxIterations = 1000;
          const precision = 1e-6;
          let guess = 0.1; // Initial guess (10%)
    
          for (let i = 0; i < maxIterations; i++) {
            const npv = calculateNPV(cashFlows, guess);
            const derivative = calculateDerivative(cashFlows, guess);
    
            if (derivative === 0) {
              throw new Error("Derivative is zero. Cannot continue with IRR calculation.");
            }
    
            const newGuess = guess - npv / derivative;
    
            if (Math.abs(newGuess - guess) < precision) {
              return newGuess * 100; // Return IRR as a percentage
            }
    
            guess = newGuess;
          }
    
          throw new Error("Failed to converge to a solution.");
        },
        },
        flatInterest: {
            description: "Future Value with Flat Interest",
            variables: ["presentValue", "annualInterestRate", "years"],
            calculate: ({ presentValue, annualInterestRate, years }) => {
            if (!presentValue || !annualInterestRate || !years) {
                throw new Error("Please provide Present Value, Annual Interest Rate, and Years.");
            }
            const rate = annualInterestRate / 100; // Convert percentage to decimal
            return presentValue + (presentValue * rate * years);
            },
        },
        futureValueWithPeriodicCompounding: {
            description: "Future Value with Periodic Compounding",
            variables: ["presentValue", "annualInterestRate", "compoundingPeriods", "timeInYears"],
            calculate: ({ presentValue, annualInterestRate, compoundingPeriods, timeInYears }) => {
              if (!presentValue || !annualInterestRate || !compoundingPeriods || !timeInYears) {
                throw new Error(
                  "Please provide Present Value, Annual Interest Rate, Compounding Periods, and Time."
                );
              }
              const ratePerPeriod = annualInterestRate / 100 / compoundingPeriods; // Convert annual rate to periodic rate
              const totalPeriods = compoundingPeriods * timeInYears; // Total compounding periods
              return presentValue * Math.pow(1 + ratePerPeriod, totalPeriods);
            },
          },
          futureValueCompoundInterest: {
            description: "Future Value with Compound Interest",
            variables: ["presentValue", "annualInterestRate", "timeInYears"],
            calculate: ({ presentValue, annualInterestRate, timeInYears }) => {
              if (!presentValue || !annualInterestRate || !timeInYears) {
                throw new Error("Please provide Present Value, Annual Interest Rate, and Time.");
              }
              const rate = annualInterestRate / 100; // Convert percentage to decimal
              return presentValue * Math.pow(1 + rate, timeInYears);
            },
          },
          equalWithdrawalsCompoundInterest: {
            description: "Equal Annual Withdrawals (Compound Interest)",
            variables: ["presentValue", "annualInterestRate", "startYear", "withdrawalYears"],
            calculate: ({ presentValue, annualInterestRate, startYear, withdrawalYears }) => {
              if (!presentValue || !annualInterestRate || !startYear || withdrawalYears.length === 0) {
                throw new Error(
                  "Please provide Present Value, Annual Interest Rate, Starting Year, and Withdrawal Years."
                );
              }
        
              const rate = annualInterestRate / 100; // Convert percentage to decimal
        
              // Step 1: Calculate Future Value after the accumulation period
              const futureValue = presentValue * Math.pow(1 + rate, startYear);
        
              // Step 2: Validate withdrawalYears (ensure all are > startYear)
              const validYears = withdrawalYears.filter((year) => year > startYear);
              if (validYears.length !== withdrawalYears.length) {
                throw new Error("All withdrawal years must be greater than the starting year.");
              }
        
              // Step 3: Calculate the total present value of withdrawals
              const totalPV = validYears.reduce((total, year) => {
                const yearIndex = year - startYear; // Number of years from the start
                return total + Math.pow(1 + rate, -yearIndex); // Discount factor for this year
              }, 0);
        
              // Step 4: Calculate Equal Annual Withdrawal (PMT)
              const annualWithdrawal = futureValue / totalPV;
        
              return annualWithdrawal;
            },
          },
          effectiveInterestRate: {
            description: "Calculate Effective Interest Rate",
            variables: ["nominalRate", "compoundingPeriods"],
            calculate: ({ nominalRate, compoundingPeriods }) => {
              if (!nominalRate || !compoundingPeriods) {
                throw new Error("Please provide Nominal Rate and Compounding Periods.");
              }
          
              if (nominalRate <= 0 || compoundingPeriods <= 0) {
                throw new Error("Nominal Rate and Compounding Periods must be greater than zero.");
              }
          
              const r = nominalRate / 100; // Convert percentage to decimal
              const n = compoundingPeriods;
              const effectiveRate = Math.pow(1 + r / n, n) - 1;
          
              return effectiveRate * 100; // Convert to percentage
            },
          },
          loanRepayment: {
            description: "Loan Repayment (Interest-Only Loan)",
            variables: ["loanAmount", "interestRate", "loanDuration", "paymentYear"],
            calculate: ({ loanAmount, interestRate, loanDuration, paymentYear }) => {
              if (!loanAmount || !interestRate || !loanDuration || !paymentYear) {
                throw new Error("Please provide all required inputs: Loan Amount, Interest Rate, Loan Duration, and Payment Year.");
              }
              if (paymentYear < 1 || paymentYear > loanDuration) {
                throw new Error("The payment year must be between 1 and the loan duration.");
              }
          
              // Full repayment of the principal occurs in the last year
              return paymentYear === loanDuration ? loanAmount : 0;
            },
          },
          futureValueOfCashFlows: {
            description: "Future Value of Cash Flows at a Specific Year",
            variables: ["cashFlows", "discountRate", "futureYear"],
            calculate: ({ cashFlows, discountRate, futureYear }) => {
              if (!cashFlows || cashFlows.length === 0 || !discountRate || futureYear === undefined) {
                throw new Error("Please provide all required inputs: Cash Flows, Discount Rate, and Future Year.");
              }
          
              const rate = discountRate / 100; // Convert percentage to decimal
          
              // Calculate Future Value for each cash flow relative to the futureYear
              return cashFlows.reduce((total, { amount, year }) => {
                if (amount === undefined || year === undefined) {
                  throw new Error("Each cash flow must have an amount and a year.");
                }
                
                const periods = futureYear - year; // Time difference (can be negative)
                return total + amount * Math.pow(1 + rate, periods); // Negative periods handle discounting
              }, 0);
            },
          },
          equalPrincipalBondInterest: {
            description: "Total Interest Paid on Equal Principal Bond",
            variables: ["principal", "annualInterestRate", "termYears"],
            calculate: ({ principal, annualInterestRate, termYears }) => {
              if (!principal || !annualInterestRate || !termYears) {
                throw new Error("Please provide Principal, Annual Interest Rate, and Term.");
              }
          
              const rate = annualInterestRate / 100; // Convert percentage to decimal
              const principalRepayment = principal / termYears; // Equal principal repayment per year
          
              let totalInterest = 0;
              for (let i = 0; i < termYears; i++) {
                const outstandingPrincipal = principal - i * principalRepayment;
                totalInterest += outstandingPrincipal * rate;
              }
          
              return totalInterest;
            },
          },
          equalPaymentLoan: {
            description: "Monthly Payment for Amortized Loan",
            variables: ["principal", "annualInterestRate", "years", "paymentNumber"],
            calculate: ({ principal, annualInterestRate, years, paymentNumber }) => {
              if (!principal || !annualInterestRate || !years || !paymentNumber) {
                throw new Error("Please provide Principal, Annual Interest Rate, Loan Term, and Payment Number.");
              }
          
              const monthlyRate = annualInterestRate / 100 / 12; // Monthly interest rate
              const totalPayments = years * 12; // Total number of payments
              const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments)); // Fixed monthly payment
          
              // Iteratively calculate remaining principal and payments
              let remainingPrincipal = principal;
              for (let k = 1; k <= paymentNumber; k++) {
                const interest = remainingPrincipal * monthlyRate;
                const principalPayment = payment - interest;
                if (k === paymentNumber) {
                  return {
                    payment: payment,
                    interest,
                    principalPayment,
                    remainingPrincipal: remainingPrincipal - principalPayment,
                  };
                }
                remainingPrincipal -= principalPayment;
              }
          
              throw new Error("Invalid Payment Number.");
            },
          },
  };
  export default formulas;