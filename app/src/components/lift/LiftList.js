import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Lift from './Lift';

const LiftList = ({ lifts, updateLifts }) => {
  return (
    <List>
      <TransitionGroup>
        {lifts.map((lift) => (
          <CSSTransition key={lift} timeout={500} classNames='fade'>
            <Grid container justify='center' direction='row'>
              <Grid item>
                <Lift lift={lift} updateLifts={updateLifts} />
              </Grid>
            </Grid>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </List>
  );
};

export default LiftList;
