import React, { useState, useEffect } from 'react';
import LiftList from './LiftList';
import LiftForm from './LiftForm';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import uuid from 'uuid/v4';

const LiftApp = () => {
  const defaultLifts = [
    { id: 1, liftName: 'Bench Press' },
    { id: 2, liftName: 'Squat' },
    { id: 3, liftName: 'Deadlift' }
  ];
  const initialLifts = JSON.parse(
    window.localStorage.getItem('lifts') || defaultLifts
  );
  const [lifts, setLifts] = useState(initialLifts);
  useEffect(() => {
    window.localStorage.setItem('lifts', JSON.stringify(lifts));
  }, [lifts]);
  const addLift = newLift => {
    setLifts([...lifts, { id: uuid(), liftName: newLift }]);
  };
  const removeLift = liftId => {
    const updatedLifts = lifts.filter(lift => lift.id !== liftId);
    setLifts(updatedLifts);
  };
  const editLift = (liftId, newLift) => {
    const updatedLifts = lifts.map(lift =>
      lift.id === liftId ? { ...lift, liftName: newLift } : lift
    );
    setLifts(updatedLifts);
  };
  return (
    <Paper
      style={{
        padding: 0,
        margin: 0,
        heights: '100vh',
        backgroundColor: '#fafafa'
      }}
      elevation={0}
    >
      <AppBar color='primary' position='static' style={{ height: '64px' }}>
        <Toolbar>
          <Typography color='inherit'>maxWellness</Typography>
        </Toolbar>
        <Grid container justify='center' style={{ marginTop: '1rem' }}>
          <Grid item xs={11} md={8} lg={4}>
            <LiftForm addLift={addLift} />
            <LiftList
              lifts={lifts}
              removeLift={removeLift}
              editLift={editLift}
            />
          </Grid>
        </Grid>
      </AppBar>
    </Paper>
  );
};

export default LiftApp;