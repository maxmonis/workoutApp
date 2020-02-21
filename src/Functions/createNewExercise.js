import uuid from 'uuid/v4';

export default currentExercise => {
  console.log(currentExercise);
  const currentLift = currentExercise.lift;
  const currentSets =
    parseInt(currentExercise.sets) > 1 ? parseInt(currentExercise.sets) : 1;
  console.log(currentSets);
  const currentReps =
    parseInt(currentExercise.reps) > 1 ? parseInt(currentExercise.reps) : 1;
  console.log(currentReps);
  const currentWeight = currentExercise.weight;
  console.log(currentWeight);
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
    sets: currentSets || 1,
    reps: currentReps || 1,
    weight: currentWeight,
    volume: currentVolume,
    id: currentId,
    classification: currentClassification,
    printout: currentPrintout
  };
  return newExercise;
};
