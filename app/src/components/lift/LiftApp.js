import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddLift from './AddLift';
import LiftList from './LiftList';

const LiftApp = ({ lifts, updateLifts, toggle }) => {
  return (
    <Paper className='paper'>
      <AddLift updateLifts={updateLifts} />
      <LiftList lifts={lifts} updateLifts={updateLifts} />
      <Button onClick={toggle} color='primary'>
        Finished Editing
      </Button>
    </Paper>
  );
};

export default LiftApp;
