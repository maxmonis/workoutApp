import { useState } from 'react';
import createCurrentExercise from '../Functions/createCurrentExercise';
import eliminateRedundancy from '../Functions/eliminateRedundancy';

export default initialCurrentWorkout => {
  const [currentWorkout, setCurrentWorkout] = useState(initialCurrentWorkout);
  return {
    currentWorkout,
    addExercise: (currentLift, currentSets, currentReps, currentWeight) => {
      const currentExercise = createCurrentExercise(
        currentLift,
        currentSets,
        currentReps,
        currentWeight
      );
      setCurrentWorkout(
        eliminateRedundancy([...currentWorkout, currentExercise])
      );
    },
    reorderWorkout: newIds => {
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
    removeExercise: exerciseId => {
      setCurrentWorkout(
        eliminateRedundancy(
          currentWorkout.filter(exercise => exercise.id !== exerciseId)
        )
      );
    },
    editExercise: (
      exerciseId,
      currentLift,
      newSets,
      newReps,
      currentWeight
    ) => {
      if (currentWeight < 1) return;
      const currentSets = newSets < 1 ? 1 : newSets;
      const currentReps = newReps < 1 ? 1 : newReps;
      const currentExercise = createCurrentExercise(
        currentLift,
        currentSets,
        currentReps,
        currentWeight
      );
      setCurrentWorkout(
        eliminateRedundancy(
          currentWorkout.map(exercise =>
            exercise.id === exerciseId ? currentExercise : exercise
          )
        )
      );
    },
    resetCurrentWorkout: () => {
      setCurrentWorkout([]);
    }
  };
};
