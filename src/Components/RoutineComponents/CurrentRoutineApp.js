import React from 'react';
import organizeRoutine from './organizeRoutine';

export default function CurrentRoutineApp({ currentRoutine }) {
  if (currentRoutine.length > 0) {
    const exercises = organizeRoutine(currentRoutine);
    return (
      <div>
        <h2>Current Workout</h2>
        {exercises.map(exercise => (
          <h3 key={exercise.id}>{`${exercise.lift}${exercise.volume}`}</h3>
        ))}
      </div>
    );
  }
  return null;
}
