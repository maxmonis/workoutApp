import React from 'react';

import useInputState from '../../hooks/useInputState';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const LiftForm = ({ addLift }) => {
  const [value, handleChange, reset] = useInputState('');
  return (
    <Paper style={{ margin: '1rem 0', padding: '0 1rem' }}>
      <form
        onSubmit={e => {
          e.preventDefault();
          value && addLift(value);
          reset();
        }}
      >
        <TextField
          value={value}
          onChange={handleChange}
          margin='normal'
          label='Add New Lift'
          fullWidth
          autoFocus={true}
        />
      </form>
    </Paper>
  );
};

export default LiftForm;
