import { useState } from 'react';

import createNewExercise from '../functions/createNewExercise';
import eliminateRedundancy from '../functions/eliminateRedundancy';

export default initialWorkout => {
  const [currentWorkout, setCurrentWorkout] = useState(initialWorkout);
  const selectedClient =
    JSON.parse(window.localStorage.getItem('selectedClient')) || null;
  const selectedClientName = selectedClient
    ? selectedClient.name.replace(' ', '')
    : '';
  const saveWorkout = updatedWorkout => {
    setCurrentWorkout(updatedWorkout);
    window.localStorage.setItem(
      `workout${selectedClientName}`,
      JSON.stringify(updatedWorkout)
    );
  };
  return {
    currentWorkout,
    resetWorkout: () => {
      setCurrentWorkout([]);
      window.localStorage.removeItem(`workout${selectedClientName}`);
    },
    reorderWorkout: newIds => {
      const reorderedWorkout = [];
      newIds.forEach(newId => {
        currentWorkout.forEach(exercise => {
          if (exercise.id === newId) {
            reorderedWorkout.push(exercise);
          }
        });
      });
      const updatedWorkout = eliminateRedundancy(reorderedWorkout);
      saveWorkout(updatedWorkout);
    },
    addExercise: exercise => {
      const newExercise = createNewExercise(exercise);
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
    editExercise: (exerciseId, updatedExercise) => {
      const newExercise = createNewExercise(updatedExercise);
      const updatedWorkout = eliminateRedundancy(
        currentWorkout.map(exercise =>
          exercise.id === exerciseId ? newExercise : exercise
        )
      );
      saveWorkout(updatedWorkout);
    }
  };
};
