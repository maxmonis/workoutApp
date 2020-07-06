import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import List from '@material-ui/core/List';
import Lift from './Lift';

const LiftList = ({ lifts, updateLifts }) => {
  return (
    <List>
      <TransitionGroup>
        {lifts.map((lift) => (
          <CSSTransition key={lift} timeout={500} classNames='fade'>
            <Lift lift={lift} updateLifts={updateLifts} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </List>
  );
};

export default LiftList;
