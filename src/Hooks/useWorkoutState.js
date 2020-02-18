import { useState } from 'react';
import uuid from 'uuid/v4';

const createCurrentExercise = (
  currentLift,
  currentSets,
  currentReps,
  currentWeight
) => {
  const currentId = uuid();
  const currentClassification =
    currentSets > 1 ? 'multiSet' : currentReps > 1 ? 'oneSet' : 'oneRep';
  const currentPrintout =
    currentClassification === 'multiSet'
      ? `${currentSets}(${currentReps}x${currentWeight})`
      : currentClassification === 'oneSet'
      ? `${currentReps}x${currentWeight}`
      : currentWeight;
  const currentVolume = currentSets * currentReps * currentWeight;
  const currentExercise = {
    lift: currentLift,
    sets: currentSets,
    reps: currentReps,
    weight: currentWeight,
    id: currentId,
    volume: currentVolume,
    classification: currentClassification,
    printout: currentPrintout,
    becamePersonalBest: false,
    surpassed: false
  };
  return currentExercise;
};

export default initialCurrentWorkout => {
  const [currentWorkout, setCurrentWorkout] = useState(initialCurrentWorkout);
  return {
    currentWorkout,
    addExercise: (currentLift, currentSets, currentReps, currentWeight) => {
      let totalSets = currentSets;
      if (currentWorkout.length > 0) {
        const mostRecentExercise = currentWorkout[currentWorkout.length - 1];
        if (
          mostRecentExercise.lift === currentLift &&
          mostRecentExercise.reps === currentReps &&
          mostRecentExercise.weight === currentWeight
        ) {
          totalSets += mostRecentExercise.sets;
          setCurrentWorkout(currentWorkout.pop());
        }
      }
      const currentExercise = createCurrentExercise(
        currentLift,
        totalSets,
        currentReps,
        currentWeight
      );
      setCurrentWorkout([...currentWorkout, currentExercise]);
    },
    removeExercise: exerciseId => {
      setCurrentWorkout(
        currentWorkout.filter(exercise => exercise.id !== exerciseId)
      );
    },
    editExercise: (exerciseId, newExercise) => {
      const currentLift = newExercise.lift;
      const currentSets = newExercise.sets;
      const currentReps = newExercise.reps;
      const currentWeight = newExercise.weight;
      const currentIndex = currentWorkout.indexOf(newExercise);
      let totalSets = currentSets;
      if (currentIndex > 0) {
        const mostRecentExercise = currentWorkout[currentIndex - 1];
        if (
          mostRecentExercise.lift === currentLift &&
          mostRecentExercise.reps === currentReps &&
          mostRecentExercise.weight === currentWeight
        ) {
          totalSets += mostRecentExercise.sets;
          setCurrentWorkout(
            currentWorkout.filter(
              exercise => exercise.id !== mostRecentExercise.id
            )
          );
        }
      }

      const currentExercise = createCurrentExercise(
        currentLift,
        totalSets,
        currentReps,
        currentWeight
      );
      setCurrentWorkout(
        currentWorkout.map(exercise =>
          exercise.id === exerciseId ? currentExercise : exercise
        )
      );
    },
    resetCurrentWorkout: () => {
      setCurrentWorkout([]);
    }
  };
};
