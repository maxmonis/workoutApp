import React, { useState, useEffect } from 'react';
import { Input } from '../layout/UI';
import { strInput } from '../../functions/helpers';

const SaveWorkout = ({ name, date, handleChange, saveWorkout, routine }) => {
  const [blurred, setBlurred] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = e => {
    e.preventDefault();
    if (name) {
      setBlurred(false);
      setError(null);
      saveWorkout();
    } else {
      setError('Workout name is required');
    }
  };
  useEffect(() => {
    blurred && !name ? setError('Workout name is required') : setError(null);
    // eslint-disable-next-line
  }, [name]);
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        name='date'
        label='Workout Date'
        type='date'
        value={date}
        handleChange={handleChange}
      />
      <Input
        name='name'
        label='Workout Name'
        value={strInput(name)}
        handleChange={handleChange}
        error={error}
      />
      {routine.length > 0 ? (
        <button className='btn one' type='submit'>
          Save Workout
        </button>
      ) : (
        <button
          className='btn tooltip bottom'
          tooltip-content='Workout must include at least one exercise'
          disabled>
          Save Workout
        </button>
      )}
    </form>
  );
};

export default SaveWorkout;
