import React, { Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Lift from './Lift';

const LiftList = ({ lifts, updateLifts }) => {
  return (
    <Paper>
      <List>
        <TransitionGroup>
          {lifts.map((lift, index) => (
            <CSSTransition key={lift} timeout={500} classNames='fade'>
              <Fragment>
                <Lift lift={lift} updateLifts={updateLifts} />
                {index < lifts.length - 1 && <Divider />}
              </Fragment>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </List>
    </Paper>
  );
};

export default LiftList;
