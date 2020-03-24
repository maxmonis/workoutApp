export default (array, property = null) => {
  return property
    ? array.sort((a, b) => {
        const textA = a[property].toUpperCase();
        const textB = b[property].toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
    : array.sort((a, b) => {
        const textA = a.toUpperCase();
        const textB = b.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
};
