export function alphabetize(array, property) {
  return array.sort((a, b) => {
    const textA = property ? a[property].toUpperCase() : a.toUpperCase();
    const textB = property ? b[property].toUpperCase() : b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
}

export function chronologize(array) {
  return array.sort((a, b) => {
    const dateA = parseInt(a.date.replace(/-/g, ''));
    const dateB = parseInt(b.date.replace(/-/g, ''));
    return dateA - dateB;
  });
}

export function getDate(date) {
  const year = date.slice(2, 4);
  const month = parseInt(date.slice(5, 7));
  const day = parseInt(date.slice(8));
  return `${month}/${day}/${year}`;
}

export function getWeekday(date) {
  const year = date.slice(0, 4);
  const month = parseInt(date.slice(5, 7));
  const day = parseInt(date.slice(8));
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayNum = new Date(`${month}-${day}-${year}`).getDay();
  return weekdays[dayNum];
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
