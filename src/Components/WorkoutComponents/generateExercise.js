import uuid from 'uuid/v4';

export default (currentLift, currentSets, currentReps, currentWeight) => {
  const currentClassification =
    currentSets > 1
      ? 'multiSet'
      : currentReps > 1
      ? 'oneSet'
      : 'oneRep';
  const currentPrintout =
    currentClassification === 'multiSet'
      ? `${currentSets}(${currentReps}x${currentWeight})`
      : currentClassification === 'oneSet'
      ? `${currentReps}x${currentWeight}`
      : currentWeight;
  const currentVolume = currentSets * currentReps * currentWeight;
  const currentExercise = {
    id: uuid(),
    lift: currentLift,
    sets: currentSets,
    reps: currentReps,
    weight: currentWeight,
    volume: currentVolume,
    classification: currentClassification,
    printout: currentPrintout
  };
  return currentExercise;
};
