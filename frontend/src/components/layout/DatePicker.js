import React from 'react';

import TextField from '@material-ui/core/TextField';

const DatePicker = ({ date, handleChange }) => {
  return (
    <form noValidate>
      <TextField
        id='date'
        label='Date'
        type='date'
        value={date}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
};

export default DatePicker;
