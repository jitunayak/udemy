export const moneyConversion = (amountInNumber: number) => {
  let amount = amountInNumber.toString();
  let lastThree = amount.substring(amount.length - 3);
  const otherNumbers = amount.substring(0, amount.length - 3);
  if (otherNumbers != "") lastThree = "," + lastThree;
  const convertedCurrencyWithDelimeter =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return convertedCurrencyWithDelimeter;
};
