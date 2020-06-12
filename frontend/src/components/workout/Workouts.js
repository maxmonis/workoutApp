import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { alphabetize } from '../../functions/helpers';
import organizeExercises from '../../functions/organizeExercises';

const Workouts = ({ workouts }) => {
  const [selected, setSelected] = useState('All');
  const filtered =
    selected !== 'All'
      ? workouts.filter((workout) => workout.name === selected)
      : workouts;
  const names = alphabetize([
    ...new Set(['All', ...workouts.map((workout) => workout.name)]),
  ]);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  return (
    <Paper className='container'>
      <Select
        native
        labelId='selected'
        value={selected}
        onChange={handleChange}
        input={<Input id='selected' />}
      >
        {names.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </Select>
      <div className='scrollable'>
        {filtered.map((workout) => (
          <div key={workout.id}>
            <Typography variant='h5'>
              {selected === 'All' && `${workout.name} - `}
              {workout.date}
            </Typography>
            {organizeExercises(workout.routine).map((exercise) => (
              <Typography
                variant='h6'
                key={exercise.id}
              >{`${exercise.lift}: ${exercise.printout}`}</Typography>
            ))}
          </div>
        ))}
      </div>
      <Button onClick={hideWorkouts}>Hide Workouts</Button>
    </Paper>
  );
};

export default Workouts;
