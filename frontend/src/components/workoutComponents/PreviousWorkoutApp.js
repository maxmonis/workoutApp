import React, { useState } from 'react';

import organizeWorkout from '../../functions/organizeWorkout';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const PreviousWorkoutApp = ({ previousWorkouts }) => {
  const [displayedWorkouts, setDisplayedWorkouts] = useState(3);
  const displayAdditionalWorkouts = () => {
    const newDisplayedWorkouts = displayedWorkouts + 3;
    setDisplayedWorkouts(newDisplayedWorkouts);
  };
  return (
    <div style={{ alignItems: 'center' }}>
      <Typography variant='h4'>Recent Workouts</Typography>
      {previousWorkouts.slice(0, displayedWorkouts).map(previousWorkout => (
        <div key={previousWorkout.id}>
          <Typography variant='h5'>
            {previousWorkout.name} - {previousWorkout.date}
          </Typography>
          {organizeWorkout(previousWorkout.workout).map(exercise => (
            <Typography
              variant='h6'
              key={exercise.id}
            >{`${exercise.lift}: ${exercise.printout}`}</Typography>
          ))}
        </div>
      ))}
      {previousWorkouts.length > displayedWorkouts && (
        <Button onClick={displayAdditionalWorkouts}>
          Show additional workouts...
        </Button>
      )}
    </div>
  );
};

export default PreviousWorkoutApp;
