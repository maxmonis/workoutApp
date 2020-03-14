import standardize from './standardize';

export default (array, property, newItem) => {
  let isDuplicate = false;
  array.forEach(item => {
    if (standardize(item[property]) === standardize(newItem)) {
      isDuplicate = true;
    }
  });
  return isDuplicate ? true : false;
};
