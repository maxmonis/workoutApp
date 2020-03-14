export default string => {
  const letters = string
    .toUpperCase()
    .replace(' ', '')
    .split('');
  if (letters.length < 2) return letters[0];
  let newString = letters[0];
  for (let i = 1; i < letters.length; i++) {
    if (letters[i] !== letters[i - 1]) newString += letters[i];
  }
  return newString;
};
