import React, { useState } from 'react';

import organizeWorkout from '../../functions/organizeWorkout';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const PreviousWorkoutApp = ({ previousWorkouts }) => {
  const [displayedWorkouts, setDisplayedWorkouts] = useState(3);
  const displayAdditionalWorkouts = () => {
    const newDisplayedWorkouts = displayedWorkouts + 3;
    setDisplayedWorkouts(newDisplayedWorkouts);
  };
  const displayFewerWorkouts = () => {
    const newDisplayedWorkouts = displayedWorkouts - 3;
    setDisplayedWorkouts(newDisplayedWorkouts);
  };
  return (
    <div style={{ width: '450px', marginTop: '20px' }}>
      <Paper style={{ padding: '20px' }}>
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
          <Button color='primary' onClick={displayAdditionalWorkouts}>
            Show additional workouts
          </Button>
        )}
        {displayedWorkouts > 3 && (
          <Button color='primary' onClick={displayFewerWorkouts}>
            Show fewer workouts
          </Button>
        )}
      </Paper>
    </div>
  );
};

export default PreviousWorkoutApp;
