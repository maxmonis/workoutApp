import uuid from 'uuid/v4';

export default (currentLift, currentSets, currentReps, currentWeight) => {
  if (typeof currentSets !== 'number') currentSets = 1;
  if (typeof currentReps !== 'number') currentReps = 1;
  if (typeof currentWeight !== 'number')
    currentWeight = parseInt(currentWeight);
  const currentId = uuid();
  const currentClassification =
    currentSets > 1 ? 'multiSet' : currentReps > 1 ? 'oneSet' : 'oneRep';
  const currentPrintout =
    currentClassification === 'multiSet'
      ? `${currentSets}(${currentReps}x${currentWeight})`
      : currentClassification === 'oneSet'
      ? `${currentReps}x${currentWeight}`
      : `${currentWeight}`;
  const currentVolume = currentSets * currentReps * currentWeight;
  const currentExercise = {
    lift: currentLift,
    sets: currentSets || 1,
    reps: currentReps || 1,
    weight: currentWeight,
    volume: currentVolume,
    id: currentId,
    classification: currentClassification,
    printout: currentPrintout
  };
  return currentExercise;
};
