import { useState, useEffect } from 'react';

const useValidate = (initialValues, validate, fn) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    if (submit) {
      if (!Object.keys(errors).length) {
        fn();
      }
      setSubmit(false);
    }
    // eslint-disable-next-line
  }, [errors]);
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate(values));
    setSubmit(true);
  };
  const handleBlur = e => {
    const { name } = e.target;
    const updatedErrors = validate(values);
    setErrors({ ...errors, [name]: updatedErrors[name] });
  };
  return { values, errors, submit, handleChange, handleSubmit, handleBlur };
};

export default useValidate;
