import React, { useState } from 'react';
import { Input } from '../layout/UI';
import { strInput } from '../../functions/helpers';

const SaveWorkout = ({
  name,
  date,
  handleChange,
  saveWorkout,
  routine,
  updateRoutine,
}) => {
  const INITIAL_ERRORS = { name: null, date: null };
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const validateDate = date =>
    /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/.test(date);
  const handleSubmit = e => {
    e.preventDefault();
    if (routine.length) {
      const isDateValid = validateDate(date);
      if (name && isDateValid) {
        setErrors(INITIAL_ERRORS);
        saveWorkout();
      } else {
        const nameError = !name ? 'Workout name is required' : null;
        const dateError = !isDateValid
          ? 'Date must be in format yyyy-mm-dd'
          : null;
        setErrors({ name: nameError, date: dateError });
      }
    }
  };
  const handleBlur = () => name && setErrors({ ...errors, name: null });
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        name='date'
        label='Workout Date'
        type='date'
        value={date}
        handleChange={handleChange}
        error={errors.date}
        persistentLabel={true}
      />
      <Input
        name='name'
        label='Workout Name'
        value={strInput(name)}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.name}
      />
      {routine.length > 0 && (
        <>
          <button className='btn one' type='submit'>
            Save Workout
          </button>
          <button onClick={() => updateRoutine([])}>Clear</button>
        </>
      )}
    </form>
  );
};

export default SaveWorkout;
