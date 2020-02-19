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
    reorderCurrentWorkout: exerciseIds => {
      const newWorkout = [];
      exerciseIds.forEach(exerciseId => {
        currentWorkout.forEach(exercise => {
          if (exerciseId === exercise.id) {
            newWorkout.push(exercise);
          }
        });
      });
      setCurrentWorkout(eliminateRedundancy(newWorkout));
    },
    resetCurrentWorkout: () => {
      setCurrentWorkout([]);
    }
  };
};
