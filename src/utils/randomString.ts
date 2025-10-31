export const getRandomColor = () => {
  const strings = ["success", "neutral", "danger"];
  const randomIndex = Math.floor(Math.random() * strings.length);
  return strings[randomIndex];
};
