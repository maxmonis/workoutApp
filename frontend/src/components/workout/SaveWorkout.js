import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const SaveWorkout = ({ name, date, handleChange, handleSave, toggle }) => {
  return (
    <Paper className='container'>
      <form noValidate>
        <TextField
          id='date'
          label='Workout Date'
          type='date'
          value={date}
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
        value={name}
        onChange={handleChange}
        autoFocus
        required
      />
      {name ? (
        <Button color='primary' onClick={handleSave}>
          Save Workout
        </Button>
      ) : (
        <Button deactivated>Save Workout</Button>
      )}
      <Button onClick={toggle}>Cancel</Button>
    </Paper>
  );
};

export default SaveWorkout;
