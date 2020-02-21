import { useState } from 'react';

import createNewExercise from '../Functions/createNewExercise';
import eliminateRedundancy from '../Functions/eliminateRedundancy';

export default initialCurrentWorkout => {
  const [currentWorkout, setCurrentWorkout] = useState(initialCurrentWorkout);
  return {
    currentWorkout,
    resetCurrentWorkout: () => {
      setCurrentWorkout([]);
    },
    reorderCurrentWorkout: newIds => {
      const newWorkout = [];
      newIds.forEach(newId => {
        currentWorkout.forEach(exercise => {
          if (exercise.id === newId) {
            newWorkout.push(exercise);
          }
        });
      });
      setCurrentWorkout(eliminateRedundancy(newWorkout));
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
