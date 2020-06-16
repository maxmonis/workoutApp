import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Records from './Records';
import Workouts from '../workout/Workouts';

const StatsApp = ({ workouts, records }) => {
  const [display, setDisplay] = useState('workouts');
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
      {display === 'workouts' ? (
        <Workouts workouts={workouts} />
      ) : (
        <Records records={records} />
      )}
    </div>
  );
};

export default StatsApp;
