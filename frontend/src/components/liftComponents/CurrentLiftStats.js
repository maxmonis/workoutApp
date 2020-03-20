import React, { Fragment } from 'react';

import organizeWorkout from '../../functions/organizeWorkout';

import Typography from '@material-ui/core/Typography';

const CurrentLiftStats = ({
  currentClient,
  currentLift,
  personalBests,
  previousWorkouts
}) => {
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
    <div style={{ width: '100%', marginLeft: '-10px' }}>
      {!currentLiftPersonalBests.length ? (
        <Typography variant='h6'>
          {currentLift} data will be displayed here once {currentClient.name}{' '}
          has attempted it
        </Typography>
      ) : (
        <Fragment>
          <Typography variant='body1'>Personal Bests</Typography>
          {currentLiftPersonalBests.map(personalBest => (
            <Typography key={personalBest.id} variant='body2'>
              {personalBest.printout}
            </Typography>
          ))}
          <Typography style={{ marginTop: '5px' }} variant='body1'>
            Recent History
          </Typography>
          {currentLiftRecentExercises.map(recentExercise => (
            <Typography key={recentExercise.id} variant='body2'>
              {recentExercise.printout}
            </Typography>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default CurrentLiftStats;
