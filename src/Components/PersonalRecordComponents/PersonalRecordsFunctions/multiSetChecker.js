export default (
  personalRecords,
  currentLift,
  currentSets,
  currentReps,
  currentWeight
) => {
  let ruledOut = false;
  const sameLift = personalRecords.filter(PR => PR.lift === currentLift);
  if (!ruledOut) {
    const heavierWithMoreReps = sameLift.filter(
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
    const heavierWithMoreSets = sameLift.filter(
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
    const higherRepsAndSets = sameLift.filter(
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
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const currentId = `${currentLift}: ${currentSets}(${currentReps}x${currentWeight})`;
    const currentVolume = currentSets * currentReps * currentWeight;
    return {
      id: currentId,
      type: 'multiSetPR',
      lift: currentLift,
      sets: currentSets,
      reps: currentReps,
      weight: currentWeight,
      volume: currentVolume,
      date: currentDate,
      broken: false
    };
  }
  return false;
};
