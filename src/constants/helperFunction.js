export const formatAmount = (amount) => {
  // Convert the number to a string
  let amountStr = amount.toString();

  // Split the string into parts before and after the decimal point (if exists)
  let parts = amountStr.split(".");

  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Join the parts back together with the decimal point (if exists)
  return parts.join(".");
};
