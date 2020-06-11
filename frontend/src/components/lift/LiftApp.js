import React from 'react';

import LiftForm from './LiftForm';
import LiftList from './LiftList';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const LiftApp = ({ lifts, updateLifts }) => {
  return (
    <Paper className='container'>
      <Grid container justify='center'>
        <Grid item xs>
          <LiftForm updateLifts={updateLifts} />
          <LiftList lifts={lifts} updateLifts={updateLifts} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LiftApp;
