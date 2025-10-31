export const getLastPlaceholder = (str: string) => {
  const regex = /\{\{\d+\}\}/g;

  // Find all matches
  const matches = str?.match(regex);

  if (!matches) return 0;

  const num = matches[matches?.length - 1].slice(2, -2); //

  return num;
};

// checks for only numbers in between {{ and }}
export const getMatcedPlaceholders = (str) => {
  const regex = /\{\{\d+\}\}/g;

  // Find all matches
  const matches = str.match(regex);

  return matches ?? [];
};

// checks for any string in between {{ and }}
export const getMatcedPlaceholdersStrings = (str) => {
  const regex = /\{\{(.*?)\}\}/g;

  // Find all matches
  const matches = Array.from(str.matchAll(regex), (m) => m[1]);

  return matches ?? [];
};

export function renumberPlaceholders(str) {
  // Regular expression to find all substrings of the form {{...}}
  const regex = /\{\{.*?\}\}/g;

  // Initialize a counter to assign valid numbers sequentially
  let validCounter = 1;

  // Replace the string's placeholders
  const updatedStr = str.replace(regex, (match) => {
    // Extract the inner content of the placeholder, removing {{ and }}
    const innerContent = match.slice(2, -2).trim();

    // If inner content is a valid number, replace it with the next valid number
    if (!isNaN(innerContent) && innerContent !== "") {
      return `{{${validCounter++}}}`;
    }

    // If it's not a valid number, leave it unchanged
    return match;
  });

  return updatedStr;
}

export function hasValidPlaceholders(str) {
  // Regular expression to match substrings like {{1}}, {{2}}, etc.
  const regex = /\{\{\d+\}\}/g;

  // Find all matches
  const matches = str.match(regex);

  // If there are no matches, return false
  if (!matches) return true;

  // Check if all matches are in the correct format
  for (let match of matches) {
    // Remove the "{{" and "}}" and check if the inside part is a number
    const num = match.slice(2, -2); // Extract the number part
    if (isNaN(num)) {
      return false; // If it's not a number, return false
    }
  }

  return true; // If all matches are valid, return true
}
