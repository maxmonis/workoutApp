const alphabetize = (array, property) =>
  array.sort((a, b) => {
    const textA = property ? a[property].toUpperCase() : a.toUpperCase();
    const textB = property ? b[property].toUpperCase() : b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

const capitalize = (string) =>
  string.match(/[a-z]/gi)
    ? // If string contains at least one letter
      string
        // filter out everything except letters and whitespace
        .replace(/[^a-z\s]+/gi, '')
        // remove excessive whitespace
        .trim()
        .replace(/[\s]+/g, ' ')
        // and capitalize the first letter of each word.
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    : // Otherwise return an empty string.
      '';

export { alphabetize, capitalize };
