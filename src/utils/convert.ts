export const convertDecimalToTwoDecimals = (value: number) => {
  return (Math.round(value * 100) / 100).toFixed(2);
};

export const convertDecimalThreeDecimals = (value: number) => {
  return (Math.round(value * 1000) / 1000).toFixed(3);
};

export const removeLeadingZeros = (str) => str.replace(/^0+/, "");
