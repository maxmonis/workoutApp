import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Lift from './Lift';
import AddLift from './AddLift';

const LiftApp = ({ lifts, updateLifts, toggleLiftForm }) => {
  return (
    <div className='lift-app'>
      <h2>Exercises</h2>
      <AddLift updateLifts={updateLifts} />
      <ul>
        <TransitionGroup>
          {lifts.map(lift => (
            <CSSTransition key={lift} timeout={500} classNames='fade'>
              <Lift lift={lift} updateLifts={updateLifts} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
      <button className='btn two' onClick={toggleLiftForm}>Done Editing</button>
    </div>
  );
};

export default LiftApp;
