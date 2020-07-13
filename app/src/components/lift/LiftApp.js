import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Lift from './Lift';
import AddLift from './AddLift';

const LiftApp = ({ lifts, updateLifts }) => {
  return (
    <div style={{ padding: '5px', minWidth: '275px', maxWidth: '75vw' }}>
      <AddLift updateLifts={updateLifts} />
      <List className='scrollable'>
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
    </div>
  );
};

export default LiftApp;
