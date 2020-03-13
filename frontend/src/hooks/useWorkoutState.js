import { useState } from 'react';

import createNewExercise from '../functions/createNewExercise';
import eliminateRedundancy from '../functions/eliminateRedundancy';

export default initialCurrentWorkout => {
  const [currentWorkout, setCurrentWorkout] = useState(initialCurrentWorkout);
  return {
    currentWorkout,
    resetCurrentWorkout: () => {
      setCurrentWorkout([]);
    },
    reorderCurrentWorkout: newIds => {
      const updatedWorkout = [];
      newIds.forEach(newId => {
        currentWorkout.forEach(exercise => {
          if (exercise.id === newId) {
            updatedWorkout.push(exercise);
          }
        });
      });
      setCurrentWorkout(eliminateRedundancy(updatedWorkout));
    },
    addExercise: currentExercise => {
      const newExercise = createNewExercise(currentExercise);
      setCurrentWorkout(eliminateRedundancy([...currentWorkout, newExercise]));
    },
    removeExercise: exerciseId => {
      setCurrentWorkout(
        eliminateRedundancy(
          currentWorkout.filter(exercise => exercise.id !== exerciseId)
        )
      );
    },
    editExercise: (exerciseId, currentExercise) => {
      const newExercise = createNewExercise(currentExercise);
      setCurrentWorkout(
        eliminateRedundancy(
          currentWorkout.map(exercise =>
            exercise.id === exerciseId ? newExercise : exercise
          )
        )
      );
    }
  };
};
