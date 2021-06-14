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

export function formatDate(date) {
  const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];
  const weekday = days[new Date(`${date.replace(/-/g, '/')}`).getDay()];
  const year = date.slice(2, 4);
  const month = parseInt(date.slice(5, 7));
  const day = parseInt(date.slice(8));
  return `${weekday} ${month}/${day}/${year}`;
}
