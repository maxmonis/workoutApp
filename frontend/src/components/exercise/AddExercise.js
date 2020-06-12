import React from 'react';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const AddExercise = ({ lifts, handleChange, exercise }) => {
  const { lift, sets, reps, weight } = exercise;
  return (
    <form className='exercise-form'>
      <Select
        className='select'
        native
        id='lift'
        value={lift}
        onChange={handleChange}
        input={<Input />}
      >
        {lifts.map((lift) => (
          <option key={lift} value={lift}>
            {lift}
          </option>
        ))}
      </Select>
      <TextField
        className='field'
        id='sets'
        label='Sets'
        type='number'
        value={sets}
        onChange={handleChange}
        autoFocus
      />
      <TextField
        className='field'
        id='reps'
        label='Reps'
        type='number'
        value={reps}
        onChange={handleChange}
      />
      <TextField
        className='field'
        id='weight'
        label='Weight'
        type='number'
        value={weight}
        onChange={handleChange}
      />
    </form>
  );
};

export default AddExercise;
