import React from 'react';
import Button from '@material-ui/core/Button';

const Exercises = ({ workouts, lift, autopopulate }) => {
  const exercises = [];
  for (let i = workouts.length - 1; i > 0; i--) {
    for (const exercise of workouts[i].routine) {
      if (
        exercise.lift === lift &&
        exercises.length < 4 &&
        !exercises.some((item) => item.printout === exercise.printout)
      )
        exercises.push(exercise);
    }
  }
  if (!exercises.length) return null;
  return (
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
  );
};

export default Exercises;
