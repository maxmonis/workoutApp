import React from 'react';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const ExerciseEntryForm = ({ lifts, handleChange, exercise }) => {
  const { lift, sets, reps, weight } = exercise;
  return (
    <div>
      <InputLabel id='currentLift'>Lift</InputLabel>
      <Select
        className='select'
        native
        labelId='currentLift'
        id='lift'
        value={lift}
        onChange={handleChange}
        input={<Input id='currentLift' />}
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
    </div>
  );
};

export default ExerciseEntryForm;
