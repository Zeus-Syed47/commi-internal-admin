export const getFormattedChip = (arr, limit) => {
  let modifiedArr =
    arr?.length > limit
      ? [...arr.slice(0, limit), arr.length > limit ? `${arr[2]}+` : arr[2]]
      : arr;

  return modifiedArr;
};
