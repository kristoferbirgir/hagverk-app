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
          equalPaymentBond: {
            description: "Equal Payment Bond (Detailed Breakdown)",
            variables: ["principal", "annualInterestRate", "years", "targetYear"],
            calculate: ({ principal, annualInterestRate, years, targetYear }) => {
              if (!principal || !annualInterestRate || !years || !targetYear) {
                throw new Error("Please provide Principal, Interest Rate, Years, and Target Year.");
              }
              if (targetYear > years) {
                throw new Error("Target year cannot exceed the loan term.");
              }
          
              const rate = annualInterestRate / 100; // Convert percentage to decimal
              const PMT = (principal * rate) / (1 - Math.pow(1 + rate, -years)); // Annual payment (PMT)
          
              // Calculate remaining principal after the targetYear - 1 payments
              const remainingPrincipalBeforeTargetYear =
                principal *
                Math.pow(1 + rate, targetYear - 1) -
                (PMT * (Math.pow(1 + rate, targetYear - 1) - 1)) / rate;
          
              // Calculate interest and principal for the targetYear
              const interestPayment = remainingPrincipalBeforeTargetYear * rate;
              const principalPayment = PMT - interestPayment;
          
              return {
                annualPayment: PMT,
                interestPayment: interestPayment,
                principalPayment: principalPayment,
                remainingPrincipalAfterPayment:
                  remainingPrincipalBeforeTargetYear - principalPayment,
              };
            },
          },
          equalPrincipalLoanNPV: {
            description: "NPV of Equal Principal Loan Payments",
            variables: ["principal", "annualInterestRate", "years", "discountRate"],
            calculate: ({ principal, annualInterestRate, years, discountRate }) => {
              if (!principal || !annualInterestRate || !years || !discountRate) {
                throw new Error("Please provide Principal, Interest Rate, Years, and Discount Rate.");
              }
          
              const rate = annualInterestRate / 100; // Convert annual interest rate to decimal
              const discount = discountRate / 100; // Convert discount rate to decimal
              const principalPayment = principal / years; // Equal principal payment
              let totalNPV = 0;
          
              for (let i = 1; i <= years; i++) {
                const remainingPrincipal = principal - (principalPayment * (i - 1)); // Remaining principal
                const interestPayment = remainingPrincipal * rate; // Interest for year i
                const totalPayment = principalPayment + interestPayment; // Total payment
                const presentValue = totalPayment / Math.pow(1 + discount, i); // Present value of this payment
                totalNPV += presentValue;
              }
          
              return totalNPV; // Total NPV of the loan
            },
          },
          equalPaymentLoanNPV: {
            description: "NPV of Equal Payment Loan",
            variables: ["principal", "annualInterestRate", "years", "discountRate"],
            calculate: ({ principal, annualInterestRate, years, discountRate }) => {
              if (!principal || !annualInterestRate || !years || !discountRate) {
                throw new Error("Please provide Principal, Interest Rate, Years, and Discount Rate.");
              }
          
              const r = annualInterestRate / 100; // Loan interest rate as decimal
              const d = discountRate / 100; // Discount rate as decimal
          
              // Step 1: Calculate annual payment (A)
              const annualPayment = (principal * r) / (1 - Math.pow(1 + r, -years));
          
              // Step 2: Calculate NPV of loan payments
              let totalNPV = 0;
              for (let i = 1; i <= years; i++) {
                const discountedPayment = annualPayment / Math.pow(1 + d, i);
                totalNPV += discountedPayment;
              }
          
              return {
                annualPayment: annualPayment.toFixed(2),
                npv: totalNPV.toFixed(2),
              };
            },
          },
          bondPrice: {
            description: "Calculate Bond Price",
            variables: ["faceValue", "couponRate", "yields", "yearsToMaturity"],
            calculate: ({ faceValue, couponRate, yields, yearsToMaturity }) => {
              if (!faceValue || !couponRate || !yearsToMaturity) {
                throw new Error("Face Value, Coupon Rate, and Years to Maturity are required inputs.");
              }
        
              if (yields.length !== yearsToMaturity) {
                throw new Error("Number of yields must match the years to maturity.");
              }
        
              const coupon = (couponRate / 100) * faceValue;
        
              // Calculate present value of coupons
              const presentValueOfCoupons = yields.reduce((sum, yieldRate, index) => {
                const rate = yieldRate.yield / 100;
                return sum + coupon / Math.pow(1 + rate, index + 1);
              }, 0);
        
              // Calculate present value of face value
              const finalYield = yields[yields.length - 1].yield / 100;
              const presentValueOfFaceValue = faceValue / Math.pow(1 + finalYield, yearsToMaturity);
        
              // Total bond price
              return presentValueOfCoupons + presentValueOfFaceValue;
            },
          },
          
          presentValueLoan: {
            description: "Calculate Present Value of a Loan (Jafngreiðslulán)",
            variables: ["principal", "annualInterestRate", "discountRate", "numPayments"],
            calculate: ({ principal, annualInterestRate, discountRate, numPayments }) => {
              if (!principal || !annualInterestRate || !discountRate || !numPayments) {
                throw new Error("Please fill in all required fields.");
              }
          
              const rate = annualInterestRate / 100;
              const discount = discountRate / 100;
          
              // Calculate Present Value for each payment
              let presentValue = 0;
              for (let i = 1; i <= numPayments; i++) {
                const payment = principal * (rate / (1 - Math.pow(1 + rate, -numPayments)));
                presentValue += payment / Math.pow(1 + discount, i);
              }
          
              return presentValue;
            },
          },
          realReturn: {
            description: "Calculate Real Return",
            variables: ["oldPrice", "newPrice", "oldCPI", "newCPI"],
            calculate: ({ oldPrice, newPrice, oldCPI, newCPI }) => {
              if (!oldPrice || !newPrice || !oldCPI || !newCPI) {
                throw new Error("Please fill in all required fields.");
              }
              const nominalReturn = (newPrice - oldPrice) / oldPrice;
              const inflationRate = (newCPI - oldCPI) / oldCPI;
              const realReturn = (1 + nominalReturn) / (1 + inflationRate) - 1;
              return realReturn;
            },
          },
            aprLoan: {
              description: "Calculate Annual Percentage Rate (APR)",
              variables: ["loanAmount", "paymentAmount", "numPayments", "loanFee", "paymentFee", "timeInYears"],
              calculate: ({ loanAmount, paymentAmount, numPayments, loanFee, paymentFee, timeInYears }) => {
                if (!loanAmount || !paymentAmount || !numPayments || !loanFee || !paymentFee || !timeInYears) {
                  throw new Error("All inputs must be provided.");
                }
          
                // Calculate net loan amount received by borrower
                const netLoanAmount = loanAmount - loanFee;
          
                // Total payment amount per payment period
                const totalPayment = paymentAmount + paymentFee;
          
                // Iterative approximation to solve for r (APR)
                const maxIterations = 1000;
                const tolerance = 1e-6;
                let apr = 0.1; // Initial guess: 10% APR
          
                for (let i = 0; i < maxIterations; i++) {
                  let npv = 0;
                  let derivative = 0;
          
                  for (let j = 1; j <= numPayments; j++) {
                    const timeFactor = j * timeInYears / numPayments;
                    const discountFactor = Math.pow(1 + apr, timeFactor);
          
                    npv += totalPayment / discountFactor;
                    derivative += -(timeFactor * totalPayment) / (discountFactor * (1 + apr));
                  }
          
                  // Add the loan amount (as a negative cash flow)
                  npv -= netLoanAmount;
          
                  if (Math.abs(npv) < tolerance) {
                    return apr * 100; // Convert APR to percentage
                  }
          
                  apr -= npv / derivative; // Newton's method
          
                  if (apr < 0) {
                    throw new Error("Failed to converge to a valid APR. Check input values.");
                  }
                }
          
                throw new Error("APR calculation did not converge.");
              },
            },
            semiAnnualBond: {
              description: "Calculate Semi-Annual Bond Price and Duration",
              variables: ["faceValue", "couponRate", "yieldRate", "yearsToMaturity"],
              calculate: ({ faceValue, couponRate, yieldRate, yearsToMaturity }) => {
                if (!faceValue || !couponRate || !yieldRate || !yearsToMaturity) {
                  throw new Error("All fields (Face Value, Coupon Rate, Yield Rate, and Years to Maturity) are required.");
                }
            
                const semiAnnualCoupon = (couponRate / 100) * faceValue / 2; // Semi-annual coupon
                const totalPeriods = yearsToMaturity * 2; // Total semi-annual periods
                const ratePerPeriod = yieldRate / 100 / 2; // Semi-annual yield
            
                let price = 0;
                let duration = 0;
            
                for (let t = 1; t <= totalPeriods; t++) {
                  const timeInYears = t / 2; // Convert periods to years
                  const discountFactor = 1 / Math.pow(1 + ratePerPeriod, t);
                  price += semiAnnualCoupon * discountFactor;
                  duration += timeInYears * semiAnnualCoupon * discountFactor;
                }
            
                // Add face value discounted to present value
                const discountFactor = 1 / Math.pow(1 + ratePerPeriod, totalPeriods);
                price += faceValue * discountFactor;
                duration += (totalPeriods / 2) * faceValue * discountFactor;
            
                duration /= price; // Weighted average time to maturity
            
                return { price, duration };
              },
            },
            bondCashFlowWithDuration: {
              description: "Bond Cash Flow and Average Duration",
              variables: ["faceValue", "annualInterestRate", "yearsToMaturity", "yieldRate"],
              calculate: ({ faceValue, annualInterestRate, yearsToMaturity, yieldRate }) => {
                if (!faceValue || !annualInterestRate || !yearsToMaturity || !yieldRate) {
                  throw new Error("All fields (Face Value, Interest Rate, Years, and Yield Rate) are required.");
                }
            
                const interestRate = annualInterestRate / 100;
                const yieldRateDecimal = yieldRate / 100;
            
                let totalPrice = 0;
                let durationNumerator = 0;
                let durationDenominator = 0;
                const cashFlows = [];
            
                let remainingPrincipal = faceValue / yearsToMaturity;
            
                for (let year = 1; year <= yearsToMaturity; year++) {
                  const interestPayment = faceValue * interestRate;
                  const totalPayment = remainingPrincipal + interestPayment;
                  const discountedPayment = totalPayment / Math.pow(1 + yieldRateDecimal, year);
            
                  totalPrice += discountedPayment;
                  durationNumerator += year * discountedPayment;
                  durationDenominator += discountedPayment;
            
                  cashFlows.push({
                    year,
                    payment: totalPayment || 0, // Ensure it's a number
                    discountedPayment: discountedPayment || 0, // Ensure it's a number
                  });
            
                  faceValue -= remainingPrincipal;
                }
            
                const averageDuration = durationDenominator > 0 ? durationNumerator / durationDenominator : 0;
            
                return {
                  totalPrice: totalPrice || 0,
                  averageDuration: averageDuration || 0,
                  cashFlows,
                };
              },
            },
            bondYieldAndDuration: {
              description: "Calculate Yield Rate and Average Duration",
              variables: ["faceValue", "annualInterestRate", "yearsToMaturity", "currentPrice"],
              calculate: ({ faceValue, annualInterestRate, yearsToMaturity, currentPrice }) => {
                if (!faceValue || !annualInterestRate || !yearsToMaturity || !currentPrice) {
                  throw new Error("All fields (Face Value, Interest Rate, Years, and Current Price) are required.");
                }
            
                const coupon = (annualInterestRate / 100) * faceValue;
            
                // Define function to calculate present value of cash flows for a given yield rate
                const calculatePresentValue = (yieldRate) => {
                  let presentValue = 0;
                  for (let year = 1; year <= yearsToMaturity; year++) {
                    const cashFlow = year === yearsToMaturity ? coupon + faceValue : coupon;
                    presentValue += cashFlow / Math.pow(1 + yieldRate, year);
                  }
                  return presentValue;
                };
            
                // Solve for yield rate using Newton-Raphson method
                let yieldRate = 0.05; // Initial guess (5%)
                for (let i = 0; i < 100; i++) {
                  const pv = calculatePresentValue(yieldRate);
                  const derivative = (calculatePresentValue(yieldRate + 0.0001) - pv) / 0.0001; // Numerical derivative
                  const adjustment = (pv - currentPrice) / derivative;
                  yieldRate -= adjustment;
                  if (Math.abs(adjustment) < 1e-6) break;
                }
            
                const yieldRatePercentage = yieldRate * 100;
            
                // Calculate average duration
                let totalPV = 0;
                let durationNumerator = 0;
                for (let year = 1; year <= yearsToMaturity; year++) {
                  const cashFlow = year === yearsToMaturity ? coupon + faceValue : coupon;
                  const discountedCashFlow = cashFlow / Math.pow(1 + yieldRate, year);
                  totalPV += discountedCashFlow;
                  durationNumerator += year * discountedCashFlow;
                }
                const averageDuration = durationNumerator / totalPV;
            
                return {
                  yieldRate: yieldRatePercentage.toFixed(2),
                  averageDuration: averageDuration.toFixed(2),
                };
              },
            },
            annualizedReturn: {
              description: "Calculate Annualized Return",
              variables: ["initialPrice", "finalPrice", "timeInWeeks"],
              calculate: ({ initialPrice, finalPrice, timeInWeeks }) => {
                if (!initialPrice || !finalPrice || !timeInWeeks) {
                  throw new Error("All fields (Initial Price, Final Price, Time in Weeks) are required.");
                }
                if (timeInWeeks <= 0) {
                  throw new Error("Time in Weeks must be greater than zero.");
                }
            
                const rateOfReturn = (finalPrice - initialPrice) / initialPrice;
                const weeksInYear = 52;
                const annualizedReturn = Math.pow(1 + rateOfReturn, weeksInYear / timeInWeeks) - 1;
            
                return {
                  annualizedReturn: (annualizedReturn * 100).toFixed(2), // Return as percentage
                };
              },
            },  
            rekstrarreikning: {
              description: "Rekstrarreikning Calculation",
              variables: [
                "revenue",
                "expenses",
                "depreciation",
                "interestBearingDebt",
                "interestRate",
                "taxRate",
              ],
              calculate: ({
                revenue = 0,
                expenses = 0,
                depreciation = 0,
                interestBearingDebt = 0,
                interestRate = 0,
                taxRate = 0,
              }) => {
                const EBITDA = revenue - expenses;
                const EBIT = EBITDA - depreciation;
                const InterestExpenses = interestBearingDebt * (interestRate / 100);
                const PreTaxIncome = EBIT - InterestExpenses;
                const Tax = PreTaxIncome * (taxRate / 100);
                const NetIncome = PreTaxIncome - Tax;
            
                return {
                  EBITDA: EBITDA.toFixed(2),
                  EBIT: EBIT.toFixed(2),
                  InterestExpenses: InterestExpenses.toFixed(2),
                  PreTaxIncome: PreTaxIncome.toFixed(2),
                  Tax: Tax.toFixed(2),
                  NetIncome: NetIncome.toFixed(2),
                };
              },
            },
            capm: {
              description: "Calculate Expected Return using CAPM",
              variables: ["riskFreeRate", "beta", "marketReturn"],
              calculate: ({ riskFreeRate, beta, marketReturn }) => {
                if (riskFreeRate === undefined || beta === undefined || marketReturn === undefined) {
                  throw new Error("All fields (Risk-Free Rate, Beta, and Market Return) are required.");
                }
            
                // CAPM formula: E(R) = Rf + Beta * (Rm - Rf)
                const expectedReturn = riskFreeRate + beta * (marketReturn - riskFreeRate);
            
                return {
                  expectedReturn: expectedReturn.toFixed(2), // Return as percentage
                };
              },
            },
            wacc: {
              description: "Calculate Weighted Average Cost of Capital (WACC)",
              variables: ["costOfEquity", "costOfDebt", "taxRate", "debtRatio"],
              calculate: ({ costOfEquity, costOfDebt, taxRate, debtRatio }) => {
                if (
                  costOfEquity === undefined ||
                  costOfDebt === undefined ||
                  taxRate === undefined ||
                  debtRatio === undefined
                ) {
                  throw new Error("All fields (Cost of Equity, Cost of Debt, Tax Rate, and Debt Ratio) are required.");
                }
            
                const equityRatio = 1 - debtRatio;
                const afterTaxCostOfDebt = costOfDebt * (1 - taxRate / 100);
            
                // WACC formula: WACC = (E/V) * Re + (D/V) * Rd * (1 - Tc)
                const wacc = equityRatio * costOfEquity + debtRatio * afterTaxCostOfDebt;
            
                return {
                  wacc: wacc.toFixed(2), // Return as percentage
                };
              },
            },
            forwardRate: {
              description: "Calculate Forward Rate (1 to 2 Years)",
              variables: ["interestRate1", "interestRate2", "time1", "time2"],
              calculate: ({ interestRate1, interestRate2, time1, time2 }) => {
                if (!interestRate1 || !interestRate2 || !time1 || !time2) {
                  throw new Error("All fields are required.");
                }
                const r1 = interestRate1 / 100; // Convert to decimal
                const r2 = interestRate2 / 100; // Convert to decimal
                const t1 = parseFloat(time1);
                const t2 = parseFloat(time2);
          
                if (t2 <= t1) {
                  throw new Error("Time2 must be greater than Time1.");
                }
          
                // Forward rate formula
                const forwardRate = ((Math.pow(1 + r2, t2) / Math.pow(1 + r1, t1)) - 1) * (1 / (t2 - t1)) * 100; // Convert back to percentage
          
                return {
                  forwardRate: forwardRate.toFixed(2), // Return as a percentage with 2 decimals
                };
              },
            },    
     
  };
  export default formulas;