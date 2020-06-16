import React from 'react';
import Button from '@material-ui/core/Button';

const Exercises = ({ workouts, lift, autopopulate }) => {
  const exercises = [];
  for (const workout of workouts) {
    for (const exercise of workout.routine) {
      if (
        exercise.lift === lift &&
        !exercises.some((item) => item.printout === exercise.printout)
      )
        exercises.push(exercise);
    }
  }
  return (
    exercises.length > 0 && (
      <div>
        <h3>{lift} History:</h3>
        {exercises.map((exercise) => (
          <Button
            key={exercise.id}
            color='inherit'
            onClick={() => autopopulate(exercise)}
          >
            {exercise.printout}
          </Button>
        ))}
      </div>
    )
  );
};

export default Exercises;
