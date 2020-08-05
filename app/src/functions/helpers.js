export function alphabetize(array, property) {
  return array.sort((a, b) => {
    const textA = property ? a[property].toUpperCase() : a.toUpperCase();
    const textB = property ? b[property].toUpperCase() : b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
}

export function numInput(value) {
  return value.toString().replace(/[^\d]/g, '');
}

export function standardize(string) {
  return string.replace(/[^a-z]/gi, '').toUpperCase();
}

export function strInput(string) {
  return string.replace(/[^a-z\s]/gi, '').replace(/[\s]+/, ' ');
}
