export default (
  personalRecords,
  currentLift,
  currentReps,
  currentWeight
) => {
  let ruledOut = false;
  const sameLift = personalRecords.filter(PR => PR.lift === currentLift);
  sameLift.forEach(PR => {
    if (PR.weight >= currentWeight && PR.reps >= currentReps) {
      ruledOut = true;
      return;
    }
  });
  if (!ruledOut) {
    const heavierPRs = sameLift.filter(PR => PR.weight >= currentWeight);
    heavierPRs.forEach(PR => {
      if (PR.reps >= currentReps) {
        ruledOut = true;
        return;
      }
    });
  }
  if (!ruledOut) {
    const higherRepPRs = sameLift.filter(PR => PR.reps >= currentReps);
    higherRepPRs.forEach(PR => {
      if (PR.weight >= currentWeight) {
        ruledOut = true;
        return;
      }
    });
  }
  if (!ruledOut) {
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const currentId = `${currentLift}: ${currentReps}x${currentWeight}`;
    const currentVolume = currentReps * currentWeight;
    return {
      id: currentId,
      type: 'oneSetPR',
      lift: currentLift,
      reps: currentReps,
      weight: currentWeight,
      volume: currentVolume,
      date: currentDate,
      broken: false
    };
  }
  return false;
};
