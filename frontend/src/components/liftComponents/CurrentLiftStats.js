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
    previousWorkouts.forEach(previousWorkout => {
      const currentLiftExercises = [];
      previousWorkout.workout.forEach(exercise => {
        if (exercise.lift === currentLift) {
          currentLiftExercises.push(exercise);
        }
      });
      currentLiftExercises.length &&
        recentExercises.push(organizeWorkout(currentLiftExercises)[0]);
    });
    return recentExercises;
  };
  const currentLiftRecentExercises = getRecentExercises();

  return (
    <div>
      <Typography variant='h6'>{currentLift}</Typography>
      <Typography variant='body1'>Personal Bests</Typography>
      {currentLiftPersonalBests &&
        currentLiftPersonalBests.map(personalBest => (
          <Typography key={personalBest.id} variant='body2'>
            {personalBest.printout}
          </Typography>
        ))}
      <Typography variant='body1'>Recent History</Typography>
      {currentLiftRecentExercises &&
        currentLiftRecentExercises.map(recentExercise => (
          <Typography key={recentExercise.id} variant='body2'>
            {recentExercise.printout}
          </Typography>
        ))}
    </div>
  );
};

export default CurrentLiftStats;
