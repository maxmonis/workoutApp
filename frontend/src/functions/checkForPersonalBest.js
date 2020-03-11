export default (personalBests, currentExercise) => {
  const currentLift = currentExercise.lift;
  const currentSets = currentExercise.sets;
  const currentReps = currentExercise.reps;
  const currentWeight = currentExercise.weight;
  const currentLiftPersonalBests = personalBests.filter(
    personalBest => !personalBest.surpassed && personalBest.lift === currentLift
  );
  if (!currentLiftPersonalBests.length) return true;
  let ruledOut = false;
  if (!ruledOut) {
    const heavierWithMoreReps = currentLiftPersonalBests.filter(
      personalBest =>
        personalBest.weight >= currentWeight && personalBest.reps >= currentReps
    );
    heavierWithMoreReps.forEach(personalBest => {
      if (personalBest.sets >= currentSets) {
        ruledOut = true;
        return;
      }
    });
  }
  if (!ruledOut) {
    const heavierWithMoreSets = currentLiftPersonalBests.filter(
      personalBest =>
        personalBest.weight >= currentWeight && personalBest.sets >= currentSets
    );
    heavierWithMoreSets.forEach(personalBest => {
      if (personalBest.reps >= currentReps) {
        ruledOut = true;
        return;
      }
    });
  }
  if (!ruledOut) {
    const higherRepsAndSets = currentLiftPersonalBests.filter(
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
  return ruledOut ? false : true;
};
