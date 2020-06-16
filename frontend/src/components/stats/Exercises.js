import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Exercises = ({ exercises, lift }) => {
  return (
    <Paper className='container'>
      <Typography variant='h6'>
        {exercises.length > 0
          ? exercises
          : `${lift} data will be displayed here once it has been attempted by this client`}
      </Typography>
    </Paper>
  );
};

export default Exercises;
