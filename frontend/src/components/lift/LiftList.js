import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Lift from './Lift';

const LiftList = ({ lifts, updateLifts }) => {
  return (
    <Paper>
      <List>
        {lifts.map((lift, index) => (
          <Fragment key={lift}>
            <Lift lift={lift} updateLifts={updateLifts} />
            {index < lifts.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default LiftList;
