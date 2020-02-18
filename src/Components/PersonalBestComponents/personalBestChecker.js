export default (currentLiftPersonalBests, currentExercise, currentDate) => {
  const currentSets = currentExercise.sets;
  const currentReps = currentExercise.reps;
  const currentWeight = currentExercise.weight;
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
  if (!ruledOut) {
    currentExercise.personalBest = currentDate;
    return currentExercise;
  }
};
