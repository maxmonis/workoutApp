const validate = ({ name, email, password, password2 }) => {
    let errors = {};
    if (!name) errors.name = 'Name is required';
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
    if (!password2) {
      errors.password2 = 'Password is required';
    } else if (password2 !== password) {
      errors.password2 = 'Passwords must match';
    } else if (password2.length < 6) {
      errors.password2 = 'Minimum password length is 6';
    }
    return errors;
  };
  
  export default validate;
  