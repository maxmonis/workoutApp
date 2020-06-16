import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Exercises from './Exercises';
import Records from './Records';
import Workouts from '../workout/Workouts';
import organizeRoutine from '../../functions/organizeRoutine';

const StatsApp = ({ workouts, records, lift }) => {
  const arr = [];
  for (const workout of workouts) {
    for (const exercise of workout.routine) {
      exercise.lift === lift && arr.push(exercise);
    }
  }
  const exercises = arr.length ? organizeRoutine(arr)[0].printout : [];
  const [display, setDisplay] = useState('exercises');
  const handleChange = (e) => {
    setDisplay(e.target.value);
  };
  return (
    <div>
      <FormControl component='fieldset'>
        <RadioGroup
          row
          aria-label='display'
          name='display'
          value={display}
          onChange={handleChange}
        >
          <FormControlLabel
            value='exercises'
            control={<Radio />}
            label='exercises'
          />
          <FormControlLabel
            value='workouts'
            control={<Radio />}
            label='workouts'
          />
          <FormControlLabel
            value='records'
            control={<Radio />}
            label='records'
          />
        </RadioGroup>
      </FormControl>
      {display === 'exercises' ? (
        <Exercises exercises={exercises} lift={lift} />
      ) : display === 'workouts' ? (
        <Workouts workouts={workouts} />
      ) : (
        <Records records={records} />
      )}
    </div>
  );
};

export default StatsApp;
