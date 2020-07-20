import React, { useState, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
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
      ? workouts.filter((workout) => workout.name === selected)
      : workouts;
  const names = alphabetize([
    ...new Set([...workouts.map((workout) => workout.name)]),
  ]);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  return (
    <Paper className='paper res'>
      <Select
        native
        className='select'
        labelId='selected'
        value={selected}
        onChange={handleChange}
        input={<Input id='selected' />}
      >
        <option key='#' value='#'>
          All Workouts
        </option>
        {names.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </Select>
      <TransitionGroup className='scrollable'>
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
              {i < workouts.length - 1 && <Divider />}
            </Fragment>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Paper>
  );
};

export default WorkoutList;
