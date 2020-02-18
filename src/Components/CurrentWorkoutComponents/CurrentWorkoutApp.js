import React, { useState } from 'react';
import organizeWorkout from '../WorkoutComponents/organizeWorkout';
import ExerciseApp from './ExerciseApp';
import Button from '@material-ui/core/Button';

export default function CurrentWorkoutApp({
  currentWorkout,
  removeExercise,
  editExercise,
  lifts,
  handleSaveWorkout
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditWorkout = () => {
    setIsEditing(true);
  };
  if (currentWorkout.length > 0 && !isEditing) {
    const exercises = organizeWorkout(currentWorkout);
    return (
      <div>
        {exercises.map(exercise => (
          <h4 key={exercise.id}>{`${exercise.lift}: ${exercise.printout}`}</h4>
        ))}
        <Button color='primary' onClick={handleEditWorkout}>
          Edit Workout
        </Button>
        <Button color='primary' onClick={handleSaveWorkout}>
          Save Workout
        </Button>
      </div>
    );
  } else if (currentWorkout.length > 0) {
    return (
      <ExerciseApp
        currentWorkout={currentWorkout}
        removeExercise={removeExercise}
        editExercise={editExercise}
        lifts={lifts}
      />
    );
  } else {
    return null;
  }
}
