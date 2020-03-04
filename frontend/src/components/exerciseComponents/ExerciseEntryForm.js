import React from 'react';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const ExerciseEntryForm = ({ lifts, handleChange, currentExercise }) => {
  return (
    <div style={{ width: '200px' }}>
      <InputLabel id='currentLift'>Lift</InputLabel>
      <Select
        native
        style={{ width: '170px' }}
        labelId='currentLift'
        id='lift'
        value={currentExercise.lift}
        onChange={handleChange}
        input={<Input id='currentLift' />}
      >
        {lifts.map(lift => (
          <option key={lift.id} value={lift.liftName}>
            {lift.liftName}
          </option>
        ))}
      </Select>

      <TextField
        id='sets'
        label='Sets'
        type='number'
        value={currentExercise.sets}
        onChange={handleChange}
      />
      <TextField
        id='reps'
        label='Reps'
        type='number'
        value={currentExercise.reps}
        onChange={handleChange}
      />
      <TextField
        required
        id='weight'
        label='Weight'
        type='number'
        value={currentExercise.weight}
        onChange={handleChange}
      />
    </div>
  );
};

export default ExerciseEntryForm;
