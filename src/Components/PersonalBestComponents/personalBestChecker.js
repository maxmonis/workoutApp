import uuid from 'uuid/v4';

export default (
  personalBests,
  currentDate,
  currentLift,
  currentSets,
  currentReps,
  currentWeight
) => {
  let ruledOut = false;
  if (!ruledOut) {
    const heavierWithMoreReps = personalBests.filter(
      personalBest =>
        personalBest.weight >= currentWeight &&
        personalBest.reps >= currentReps
    );
    heavierWithMoreReps.forEach(personalBest => {
      if (personalBest.sets >= currentSets) {
        ruledOut = true;
        return;
      }
    });
  }
  if (!ruledOut) {
    const heavierWithMoreSets = personalBests.filter(
      personalBest =>
        personalBest.weight >= currentWeight &&
        personalBest.sets >= currentSets
    );
    heavierWithMoreSets.forEach(personalBest => {
      if (personalBest.reps >= currentReps) {
        ruledOut = true;
        return;
      }
    });
  }
  if (!ruledOut) {
    const higherRepsAndSets = personalBests.filter(
      personalBest =>
        personalBest.reps >= currentReps && personalBest.sets >= currentSets
    );
    higherRepsAndSets.forEach(personalBest => {
      if (personalBest.weight >= currentWeight) {
        ruledOut = true;
        return;
      }
    });
  }
  const currentId = uuid();
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
  const personalBest = ruledOut ? false : currentDate;
  return {
    id: currentId,
    lift: currentLift,
    sets: currentSets,
    reps: currentReps,
    weight: currentWeight,
    volume: currentVolume,
    classification: currentClassification,
    printout: currentPrintout,
    becamePersonalBest: personalBest,
    surpassed: false
  };
};
