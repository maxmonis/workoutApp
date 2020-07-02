import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
  const [flagged, setFlagged] = useState(null);
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
  const handleDelete = () => updateWorkouts(flagged);
  const handleSelect = () => {
    if (editingWorkout && editingWorkout.id === flagged) {
      selectWorkout(null);
    } else {
      const workout = workouts.find((workout) => workout.id === flagged);
      selectWorkout(workout);
    }
  };
  const handleClick = (e) => {
    const { value } = e.target;
    flagged === value ? setFlagged(null) : setFlagged(value);
  };
  return (
    <Paper className='paper'>
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
        {filtered.map((workout) => (
          <CSSTransition key={workout.id} timeout={500} classNames='fade'>
            <Workout
              workout={workout}
              selected={selected}
              flagged={flagged}
              editingWorkout={editingWorkout}
              handleSelect={handleSelect}
              handleClick={handleClick}
              handleDelete={handleDelete}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Paper>
  );
};

export default WorkoutList;
