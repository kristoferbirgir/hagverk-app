/**
 * Calculate the Net Present Value (NPV)
 * @param {Array} cashFlows - Array of cash flow objects [{ amount, year }]
 * @param {number} rate - Discount rate as a decimal (e.g., 0.1 for 10%)
 * @returns {number} - NPV value
 */
export const calculateNPV = (cashFlows, rate) =>
    cashFlows.reduce((sum, { amount, year }) => sum + amount / Math.pow(1 + rate, year), 0);
  
  /**
   * Calculate the derivative of NPV with respect to the discount rate
   * @param {Array} cashFlows - Array of cash flow objects [{ amount, year }]
   * @param {number} rate - Discount rate as a decimal (e.g., 0.1 for 10%)
   * @returns {number} - Derivative of NPV
   */
  export const calculateDerivative = (cashFlows, rate) =>
    cashFlows.reduce((sum, { amount, year }) => sum - (year * amount) / Math.pow(1 + rate, year + 1), 0);
  