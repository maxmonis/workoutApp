import React from 'react';

import AddLiftForm from './AddLiftForm';
import LiftList from './LiftList';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const LiftApp = ({ lifts, updateLifts, toggle }) => {
  return (
    <Paper className='container'>
      <Grid container justify='center'>
        <Grid item xs>
          <AddLiftForm updateLifts={updateLifts} />
          <LiftList lifts={lifts} updateLifts={updateLifts} />
        </Grid>
      </Grid>
      <Button onClick={toggle} color='primary'>
        Finished Editing
      </Button>
    </Paper>
  );
};

export default LiftApp;
