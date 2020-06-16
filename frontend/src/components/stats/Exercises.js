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
  if (!exercises.length) return null;
  return (
    <div>
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
  );
};

export default Exercises;
