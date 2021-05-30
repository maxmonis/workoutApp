const validate = ({ email, password }) => {
    let errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid email';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Minimum password length is 6';
    }
    return errors;
  };
  
  export default validate;
  