import React from 'react';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const ExerciseEntryForm = ({ lifts, handleChange, currentExercise }) => {
  return (
    <div style={{ width: '180px', alignItems: 'center' }}>
      <InputLabel id='currentLift'>Lift</InputLabel>
      <Select
        style={{ fontSize: '20px', width: '100%' }}
        native
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
        style={styles.field}
        id='sets'
        label='Sets'
        type='number'
        value={currentExercise.sets}
        onChange={handleChange}
        inputProps={{ style: { textAlign: 'center' } }}
      />
      <TextField
        style={styles.field}
        id='reps'
        label='Reps'
        type='number'
        value={currentExercise.reps}
        onChange={handleChange}
        inputProps={{ style: { textAlign: 'center' } }}
      />
      <TextField
        style={styles.field}
        id='weight'
        label='Weight'
        type='number'
        value={currentExercise.weight}
        onChange={handleChange}
        inputProps={{ style: { textAlign: 'center' } }}
      />
    </div>
  );
};

const styles = {
  field: {
    width: '50px',
    margin: '5px',
    textAlign: 'center'
  }
};

export default ExerciseEntryForm;
