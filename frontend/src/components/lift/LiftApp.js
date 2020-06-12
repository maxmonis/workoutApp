import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddLift from './AddLift';
import LiftList from './LiftList';


const LiftApp = ({ lifts, updateLifts, toggle }) => {
  return (
    <Paper className='container'>
      <Grid container justify='center'>
        <Grid item xs>
          <AddLift updateLifts={updateLifts} />
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
