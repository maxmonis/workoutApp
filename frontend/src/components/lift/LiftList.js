import React, { Fragment } from 'react';

import Lift from './Lift';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

const LiftList = ({ lifts, updateLifts }) => {
  if (lifts.length)
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
  return null;
};

export default LiftList;
