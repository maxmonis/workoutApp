import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Lift from './Lift';
import AddLift from './AddLift';

const LiftApp = ({ lifts, updateLifts, toggle }) => {
  return (
    <Paper className='paper narrow'>
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
      <Button onClick={toggle} color='primary'>
        Finished Editing
      </Button>
    </Paper>
  );
};

export default LiftApp;
