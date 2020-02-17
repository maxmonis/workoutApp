import React from 'react';
import organizeWorkout from './organizeWorkout';

export default function CurrentWorkoutApp({ currentWorkout }) {
  if (currentWorkout.length > 0) {
    const exercises = organizeWorkout(currentWorkout);
    return (
      <div>
        {exercises.map(exercise => (
          <h3 key={exercise.id}>{`${exercise.lift}: ${exercise.printout}`}</h3>
        ))}
      </div>
    );
  }
  return null;
}
