import React from 'react';
import Button from '@material-ui/core/Button';

const ExerciseHistory = ({ workouts, lift, autopopulate }) => {
  const exercises = [];
  for (let i = workouts.length - 1; i >= 0; i--) {
    for (const exercise of workouts[i].routine) {
      if (
        exercise.lift === lift &&
        !exercises.some((item) => item.printout === exercise.printout)
      )
        exercises.push(exercise);
    }
  }
  return (
    <div className='exercise-history'>
      {!exercises.length ? (
        <h5>No {lift} stats for this client</h5>
      ) : (
        <div>
          {exercises.map((exercise) => (
            <Button
              style={{ textTransform: 'lowercase' }}
              key={exercise.id}
              color='primary'
              onClick={() => autopopulate(exercise)}
            >
              {exercise.printout}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseHistory;
