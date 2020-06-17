import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const SaveWorkout = ({ name, date, handleChange, handleSave, toggle }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };
  return (
    <form onSubmit={handleSubmit}>
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
        <Button color='primary' type='submit'>
          Save
        </Button>
      </div>
    </form>
  );
};

export default SaveWorkout;
