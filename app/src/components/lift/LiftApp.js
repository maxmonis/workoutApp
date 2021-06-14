import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Lift from './Lift';
import AddLift from './AddLift';

const LiftApp = ({ lifts, updateLifts, toggle }) => {
  return (
    <div className='lift-app'>
      <h1>Exercises</h1>
      <AddLift updateLifts={updateLifts} />
      <ul className='scrollable'>
        <TransitionGroup>
          {lifts.map(lift => (
            <CSSTransition key={lift} timeout={500} classNames='fade'>
              <Lift lift={lift} updateLifts={updateLifts} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
      <button className='btn two' onClick={toggle}>Done Editing</button>
    </div>
  );
};

export default LiftApp;
