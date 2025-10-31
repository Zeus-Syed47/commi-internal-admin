export const removeCountryCode = (phone, subString) => {
  let formattedSubString = subString?.slice(1);
  if (phone.startsWith(formattedSubString)) {
    return phone.slice(formattedSubString?.length); // Remove the first 3 characters
  }
  return phone;
};
