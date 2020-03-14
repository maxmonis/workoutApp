export default (array, property) => {
  return array.sort((a, b) => {
    const textA = a[property].toUpperCase();
    const textB = b[property].toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
};
