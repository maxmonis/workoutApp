import React from 'react';
import LiftList from './LiftList';
import LiftForm from './LiftForm';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
      <Grid container justify='center' >
        <Grid item xs>
          <LiftForm addLift={addLift} />
          <LiftList lifts={lifts} removeLift={removeLift} editLift={editLift} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LiftApp;
