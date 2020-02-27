import uuid from 'uuid/v4';

export default currentExercise => {
  const currentLift = currentExercise.lift;
  const currentSets = +currentExercise.sets > 1 ? +currentExercise.sets : 1;
  const currentReps = +currentExercise.reps > 1 ? +currentExercise.reps : 1;
  const currentWeight = +currentExercise.weight;
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
  const newExercise = {
    lift: currentLift,
    sets: currentSets,
    reps: currentReps,
    weight: currentWeight,
    volume: currentVolume,
    id: currentId,
    classification: currentClassification,
    printout: currentPrintout
  };
  return newExercise;
};
