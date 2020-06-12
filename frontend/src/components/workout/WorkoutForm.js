import React from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const WorkoutForm = ({ workout, handleChange, handleSave }) => {
  return (
    <Paper className='container'>
      <form noValidate>
        <TextField
          id='date'
          label='Date'
          type='date'
          value={workout.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <TextField
        id='name'
        label='Workout Name'
        type='string'
        value={workout.name}
        onChange={handleChange}
        autoFocus
        required
      />
      <Button color='primary' onClick={handleSave}>
        Save Workout
      </Button>
    </Paper>
  );
};

export default WorkoutForm;
