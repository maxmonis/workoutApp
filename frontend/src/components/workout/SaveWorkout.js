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
        InputLabelProps={{
          shrink: !!name,
        }}
        autoFocus
        required
      />
      <div>
        <Button onClick={toggle}>Cancel</Button>
        {name ? (
          <Button color='primary' onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button disabled>Save</Button>
        )}
      </div>
    </Paper>
  );
};

export default SaveWorkout;
