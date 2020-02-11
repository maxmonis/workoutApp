import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Lift from './Lift';

const LiftList = ({ lifts, removeLift, editLift }) => {
  if (lifts.length)
  return (
    <Paper>
      <List>
        {lifts.map((lift, i) => (
          <Fragment key={lift.id}>
            <Lift
              {...lift}
              key={lift.id}
              removeLift={removeLift}
              editLift={editLift}
            />
            {i < lifts.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </Paper>
  );
  return null
};

export default LiftList;