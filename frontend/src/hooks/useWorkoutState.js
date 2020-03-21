import { useState } from 'react';

import createNewExercise from '../functions/createNewExercise';
import eliminateRedundancy from '../functions/eliminateRedundancy';

export default initialWorkout => {
  const [currentWorkout, setCurrentWorkout] = useState(initialWorkout);
  const saveWorkout = updatedWorkout => {
    setCurrentWorkout(updatedWorkout);
    window.localStorage.setItem(
      'currentWorkout',
      JSON.stringify(updatedWorkout)
    );
  };
  return {
    currentWorkout,
    resetCurrentWorkout: () => {
      setCurrentWorkout([]);
      window.localStorage.removeItem('currentWorkout');
    },
    reorderCurrentWorkout: newIds => {
      const arrayOfExercises = [];
      newIds.forEach(newId => {
        currentWorkout.forEach(exercise => {
          if (exercise.id === newId) {
            arrayOfExercises.push(exercise);
          }
        });
      });
      const updatedWorkout = eliminateRedundancy(arrayOfExercises);
      saveWorkout(updatedWorkout);
    },
    addExercise: currentExercise => {
      const newExercise = createNewExercise(currentExercise);
      const updatedWorkout = eliminateRedundancy([
        ...currentWorkout,
        newExercise
      ]);
      saveWorkout(updatedWorkout);
    },
    removeExercise: exerciseId => {
      const updatedWorkout = eliminateRedundancy(
        currentWorkout.filter(exercise => exercise.id !== exerciseId)
      );
      saveWorkout(updatedWorkout);
    },
    editExercise: (exerciseId, currentExercise) => {
      const newExercise = createNewExercise(currentExercise);
      const updatedWorkout = eliminateRedundancy(
        currentWorkout.map(exercise =>
          exercise.id === exerciseId ? newExercise : exercise
        )
      );
      saveWorkout(updatedWorkout);
    }
  };
};
