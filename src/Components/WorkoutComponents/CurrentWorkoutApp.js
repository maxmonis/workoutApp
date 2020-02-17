import React from 'react';
import organizeWorkout from './organizeWorkout';
import Button from '@material-ui/core/Button';

export default function CurrentWorkoutApp({
  currentWorkout,
  handleEditWorkout,
  handleSaveWorkout,
  currentWorkoutName
}) {
  if (currentWorkout.length > 0) {
    const exercises = organizeWorkout(currentWorkout);
    return (
      <div>
        {exercises.map(exercise => (
          <h3 key={exercise.id}>{`${exercise.lift}: ${exercise.printout}`}</h3>
        ))}
        <div>
          <Button onClick={handleEditWorkout}>Edit Workout</Button>
        </div>
        {currentWorkoutName === '' ? (
          <div>
            <Button disabled color='primary'>
              Enter Name to Save Workout
            </Button>
          </div>
        ) : (
          <Button onClick={handleSaveWorkout} color='primary'>
            Save Workout
          </Button>
        )}
      </div>
    );
  }
  return null;
}
