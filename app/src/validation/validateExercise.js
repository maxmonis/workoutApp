const validate = ({ weight }) => {
  let errors = {};
  if (!weight) {
    errors.weight = 'Weight is required';
  }
  return errors;
};

export default validate;
