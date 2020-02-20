import React from 'react';

import LiftForm from './LiftForm';
import LiftList from './LiftList';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const LiftApp = ({ lifts, removeLift, editLift, addLift }) => {
  return (
    <Paper
      style={{
        width: '400px',
        padding: 0,
        margin: 0,
        heights: '100vh',
        backgroundColor: '#fafafa'
      }}
      elevation={0}
    >
      <Grid container justify='center'>
        <Grid item xs>
          <LiftForm addLift={addLift} />
          <LiftList lifts={lifts} removeLift={removeLift} editLift={editLift} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LiftApp;
