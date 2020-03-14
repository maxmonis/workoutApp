import standardize from './standardize';

export default (array, property, newString) => {
  let isDuplicate = false;
  array.forEach(string => {
    if (standardize(string[property]) === standardize(newString)) {
      isDuplicate = true;
    }
  });
  return isDuplicate ? true : false;
};
