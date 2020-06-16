const alphabetize = (array, property) =>
  array.sort((a, b) => {
    const textA = property ? a[property].toUpperCase() : a.toUpperCase();
    const textB = property ? b[property].toUpperCase() : b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

const capitalize = (string) =>
  string.match(/[a-z]/gi)
    ? string
        .replace(/[^a-z\s]+/gi, '')
        .trim()
        .replace(/[\s]+/g, ' ')
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    : '';

export { alphabetize, capitalize };
