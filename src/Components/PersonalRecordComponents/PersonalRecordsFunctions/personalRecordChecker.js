export default (
  personalRecords,
  currentLift,
  currentSets,
  currentReps,
  currentWeight,
  currentDate
) => {
  let ruledOut = false;
  if (!ruledOut) {
    const heavierWithMoreReps = personalRecords.filter(
      PR => PR.weight >= currentWeight && PR.reps >= currentReps
    );
    heavierWithMoreReps.forEach(PR => {
      if (PR.sets >= currentSets) {
        ruledOut = true;
        return;
      }
    });
  }
  if (!ruledOut) {
    const heavierWithMoreSets = personalRecords.filter(
      PR => PR.weight >= currentWeight && PR.sets >= currentSets
    );
    heavierWithMoreSets.forEach(PR => {
      if (PR.reps >= currentReps) {
        ruledOut = true;
        return;
      }
    });
  }
  if (!ruledOut) {
    const higherRepsAndSets = personalRecords.filter(
      PR => PR.reps >= currentReps && PR.sets >= currentSets
    );
    higherRepsAndSets.forEach(PR => {
      if (PR.weight >= currentWeight) {
        ruledOut = true;
        return;
      }
    });
  }
  if (!ruledOut) {
    const currentType =
      currentSets > 1 && currentReps > 0
        ? 'multiSetPR'
        : currentReps > 1
        ? 'oneSetPR'
        : 'oneRepPR';
    const currentId =
      currentType === 'multiSetPR'
        ? `${currentLift}: ${currentSets}(${currentReps}x${currentWeight})`
        : currentType === 'oneSetPR'
        ? `${currentLift}: ${currentReps}x${currentWeight}`
        : `${currentLift}: ${currentWeight}`;
    const currentVolume = currentSets * currentReps * currentWeight;
    return {
      id: currentId,
      type: currentType,
      lift: currentLift,
      sets: currentSets,
      reps: currentReps,
      weight: currentWeight,
      volume: currentVolume,
      acheived: currentDate,
      surpassed: false
    };
  }
  return false;
};
