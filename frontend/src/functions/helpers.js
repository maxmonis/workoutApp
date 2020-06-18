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

const chronologize = (array) =>
  array.sort((a, b) => {
    const dateA = parseInt(a.date.replace(/-/g, ''));
    const dateB = parseInt(b.date.replace(/-/g, ''));
    return dateA - dateB;
  });

const getDate = (date) => {
  const year = date.slice(0, 4);
  const month = parseInt(date.slice(5, 7));
  const day = parseInt(date.slice(8));
  return `${month}/${day}/${year}`;
};

const standardize = (string) =>
  string.replace(/[^a-z\s]/gi, '').replace(/[\s]+/, ' ');

export { alphabetize, capitalize, chronologize, getDate, standardize };
