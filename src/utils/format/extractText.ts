export const formatSentenceFromAI = (input) => {
  const match = input.match(/"([^"]+)"/); // Regex to match text inside quotes
  const extractedSentence = match ? match[1] : null;
  return extractedSentence;
};
