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
    printout: currentPrintout
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
    editExercise: (
      exerciseId,
      currentLift,
      newSets,
      newReps,
      currentWeight,
      currentIndex
    ) => {
      if (currentWeight < 1) return;
      const currentSets = newSets < 1 ? 1 : newSets;
      const currentReps = newReps < 1 ? 1 : newReps;
      let totalSets = currentSets;
      let redundantExercise = false;
      if (currentIndex > 0) {
        const mostRecentExercise = currentWorkout[currentIndex - 1];
        if (
          mostRecentExercise.lift === currentLift &&
          mostRecentExercise.reps === currentReps &&
          mostRecentExercise.weight === currentWeight
        ) {
          redundantExercise = mostRecentExercise;
          totalSets += parseInt(mostRecentExercise.sets);
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
      if (redundantExercise) {
        setCurrentWorkout(
          currentWorkout
            .filter(exercise => exercise.id !== redundantExercise.id)
            .map(exercise =>
              exercise.id === exerciseId ? currentExercise : exercise
            )
        );
      } else {
        setCurrentWorkout(
          currentWorkout.map(exercise =>
            exercise.id === exerciseId ? currentExercise : exercise
          )
        );
      }
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
      setCurrentWorkout(newWorkout);
    },
    resetCurrentWorkout: () => {
      setCurrentWorkout([]);
    }
  };
};
