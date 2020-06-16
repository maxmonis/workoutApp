import React from 'react';
import Button from '@material-ui/core/Button';

const Exercises = ({ workouts, lift, autopopulate }) => {
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
  return exercises.length ? (
    <div className='exercises'>
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
  ) : (
    <h5>No recent {lift} stats for this client</h5>
  );
};

export default Exercises;
