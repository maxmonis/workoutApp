import { useState } from 'react';

import createNewExercise from '../functions/createNewExercise';
import eliminateRedundancy from '../functions/eliminateRedundancy';

export default (initialWorkout) => {
  const [currentWorkout, setCurrentWorkout] = useState(initialWorkout);

  return {
    currentWorkout,
    resetWorkout: () => {
      setCurrentWorkout([]);
    },
    reorderWorkout: (newIds) => {
      const reorderedWorkout = [];
      newIds.forEach((newId) => {
        currentWorkout.forEach((exercise) => {
          if (exercise.id === newId) {
            reorderedWorkout.push(exercise);
          }
        });
      });
      const updatedWorkout = eliminateRedundancy(reorderedWorkout);
      setCurrentWorkout(updatedWorkout);
    },
    addExercise: (exercise) => {
      const newExercise = createNewExercise(exercise);
      const updatedWorkout = eliminateRedundancy([
        ...currentWorkout,
        newExercise,
      ]);
      setCurrentWorkout(updatedWorkout);
    },
    removeExercise: (exerciseId) => {
      const updatedWorkout = eliminateRedundancy(
        currentWorkout.filter((exercise) => exercise.id !== exerciseId)
      );
      setCurrentWorkout(updatedWorkout);
    },
    editExercise: (exerciseId, updatedExercise) => {
      const newExercise = createNewExercise(updatedExercise);
      const updatedWorkout = eliminateRedundancy(
        currentWorkout.map((exercise) =>
          exercise.id === exerciseId ? newExercise : exercise
        )
      );
      setCurrentWorkout(updatedWorkout);
    },
  };
};
