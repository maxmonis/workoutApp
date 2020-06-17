import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { alphabetize } from '../../functions/helpers';
import organizeRoutine from '../../functions/organizeRoutine';

const Workouts = ({ workouts }) => {
  const [selected, setSelected] = useState('');
  const filtered = selected
    ? workouts.filter((workout) => workout.name === selected)
    : workouts;
  const names = alphabetize([
    ...new Set([...workouts.map((workout) => workout.name)]),
  ]);
  const handleChange = (e) => {
    setSelected(e.target.value);
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
        <option key={'All'} value=''>
          All Workouts
        </option>
        {names.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </Select>
      <div className='scrollable'>
        {filtered.map((workout, i) => (
          <div key={workout.id}>
            <Typography variant='h6'>
              {!selected && `${workout.name} `}
              {workout.date}
            </Typography>
            <ul className='left'>
              {organizeRoutine(workout.routine).map((exercise) => (
                <li
                  key={exercise.id}
                >{`${exercise.lift}: ${exercise.printout}`}</li>
              ))}
            </ul>
            {i < filtered.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default Workouts;
