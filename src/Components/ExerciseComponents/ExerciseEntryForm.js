import React from 'react';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const ExerciseEntryForm = ({
  lifts,
  handleChange,
  currentLift,
  currentSets,
  currentReps,
  currentWeight
}) => (
  <div style={{ width: '200px' }}>
    <InputLabel id='currentLift'>Lift</InputLabel>
    <Select
      native
      style={{ width: '170px' }}
      labelId='currentLift'
      id='liftName'
      value={currentLift}
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
      id='numSets'
      label='Sets'
      type='number'
      value={currentSets}
      onChange={handleChange}
    />
    <TextField
      id='numReps'
      label='Reps'
      type='number'
      value={currentReps}
      onChange={handleChange}
    />
    <TextField
      required
      id='currentWeight'
      label='Weight'
      type='number'
      value={currentWeight}
      onChange={handleChange}
    />
  </div>
);

export default ExerciseEntryForm;
