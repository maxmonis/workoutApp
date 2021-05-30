import React, { useState, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { alphabetize } from '../../functions/helpers';
import Workout from './Workout';

const WorkoutList = ({
  workouts,
  updateWorkouts,
  selectWorkout,
  editingWorkout,
}) => {
  const [selected, setSelected] = useState('#');
  const filtered =
    selected !== '#'
      ? workouts.filter(workout => workout.name === selected)
      : workouts;
  const names = alphabetize([
    ...new Set([...workouts.map(workout => workout.name)]),
  ]);
  const handleChange = e => {
    setSelected(e.target.value);
  };
  return (
    <div>
      <select className='select' value={selected} onChange={handleChange}>
        <option key='#' value='#'>
          All Workouts
        </option>
        {names.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <TransitionGroup>
        <div className='scrollable'>
          {filtered.map((workout, i) => (
            <CSSTransition key={workout.id} timeout={500} classNames='fade'>
              <Fragment>
                <Workout
                  workout={workout}
                  selected={selected}
                  editingWorkout={editingWorkout}
                  selectWorkout={selectWorkout}
                  updateWorkouts={updateWorkouts}
                />
              </Fragment>
            </CSSTransition>
          ))}
        </div>
      </TransitionGroup>
    </div>
  );
};

export default WorkoutList;
