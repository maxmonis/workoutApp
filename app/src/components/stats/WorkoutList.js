import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { alphabetize } from '../../functions/helpers';
import Workout from '../workout/Workout';

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
    <>
      {workouts.length ? (
        <>
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
          <TransitionGroup className='scrollable'>
            {filtered.map(workout => (
              <CSSTransition key={workout.id} timeout={500} classNames='fade'>
                <Workout
                  workout={workout}
                  selected={selected}
                  editingWorkout={editingWorkout}
                  selectWorkout={selectWorkout}
                  updateWorkouts={updateWorkouts}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </>
      ) : (
        <h4 class="intro-text">
          Your workouts will be displayed here. We recommend giving them names
          which describe the focus of that routine (eg. full body, chest and
          back, legs, etc.) since you'll then be able to filter your workouts by
          name. New personal records will be flagged with an asterisk.
        </h4>
      )}
    </>
  );
};

export default WorkoutList;
