import React from 'react';

import organizeWorkout from '../../functions/organizeWorkout';

import Typography from '@material-ui/core/Typography';

const CurrentLiftStats = ({ currentLift, personalBests, previousWorkouts }) => {
  const currentPersonalBests = personalBests.filter(
    personalBest => !personalBest.surpassed
  );
  const currentLiftPersonalBests = organizeWorkout(
    currentPersonalBests.filter(
      personalBest => personalBest.lift === currentLift
    )
  );
  const getRecentExercises = () => {
    const recentExercises = [];
    const printouts = [];
    previousWorkouts.forEach(previousWorkout =>
      previousWorkout.workout.forEach(exercise => {
        if (
          exercise.lift === currentLift &&
          !printouts.includes(exercise.printout)
        ) {
          recentExercises.push(exercise);
          printouts.push(exercise.printout);
        }
      })
    );
    return organizeWorkout(recentExercises);
  };
  const currentLiftRecentExercises = getRecentExercises();

  return (
    <div>
      <Typography variant='h6'>{currentLift}</Typography>
      <Typography variant='body1'>Personal Bests</Typography>
      {currentLiftPersonalBests.map(personalBest => (
        <Typography key={personalBest.id} variant='body2'>
          {personalBest.printout}
        </Typography>
      ))}
      <Typography variant='body1'>Recently Completed</Typography>
      {currentLiftRecentExercises.map(recentExercise => (
        <Typography key={recentExercise.id} variant='body2'>
          {recentExercise.printout}
        </Typography>
      ))}
    </div>
  );
};

export default CurrentLiftStats;
