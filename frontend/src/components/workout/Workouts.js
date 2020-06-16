import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { alphabetize } from '../../functions/helpers';
import organizeRoutine from '../../functions/organizeRoutine';

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
        className='select'
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
            <Typography variant='h6'>
              {selected === 'All' && `${workout.name} `}
              {workout.date}
            </Typography>
            <ul className='left'>
              {organizeRoutine(workout.routine).map((exercise) => (
                <li
                  key={exercise.id}
                >{`${exercise.lift}: ${exercise.printout}`}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default Workouts;
