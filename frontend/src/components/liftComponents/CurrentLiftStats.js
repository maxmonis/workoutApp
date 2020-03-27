import React from 'react';

import organizeExercises from '../../functions/organizeExercises';

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
  const currentLiftPersonalBests = organizeExercises(
    currentPersonalBests.filter(
      personalBest => personalBest.lift === currentLift
    )
  );
  const recentExercises = [];
  previousWorkouts.forEach(previousWorkout => {
    const currentLiftExercises = [];
    previousWorkout.workout.forEach(exercise => {
      exercise.lift === currentLift && currentLiftExercises.push(exercise);
    });
    currentLiftExercises.length &&
      recentExercises.push(organizeExercises(currentLiftExercises)[0]);
  });

  return (
    <div
      style={{
        height: '230px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {!currentLiftPersonalBests.length ? (
        <Typography variant='h6'>
          {currentLift} data will be displayed here once {currentClient.name}{' '}
          has attempted it
        </Typography>
      ) : (
        <div style={{ overflowY: 'auto' }}>
          <Typography variant='body1'>Personal Bests</Typography>
          {currentLiftPersonalBests.map(personalBest => (
            <Typography key={personalBest.id} variant='body2'>
              {personalBest.printout}
            </Typography>
          ))}
          <Typography style={{ marginTop: '5px' }} variant='body1'>
            Recent History
          </Typography>
          {recentExercises.map(recentExercise => (
            <Typography key={recentExercise.id} variant='body2'>
              {recentExercise.printout}
            </Typography>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentLiftStats;
