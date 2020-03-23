export default (personalBests, exercise) => {
  const currentPersonalBests = personalBests.filter(
    personalBest => !personalBest.surpassed
  );
  const sameLiftPersonalBests = currentPersonalBests.filter(
    personalBest => personalBest.lift === exercise.lift
  );
  if (!sameLiftPersonalBests.length) return true;
  let ruledOut = false;
  if (!ruledOut) {
    const heavierWithMoreReps = sameLiftPersonalBests.filter(
      personalBest =>
        personalBest.weight >= exercise.weight &&
        personalBest.reps >= exercise.reps
    );
    heavierWithMoreReps.forEach(personalBest => {
      if (personalBest.sets >= exercise.sets) {
        ruledOut = true;
      }
    });
  }
  if (!ruledOut) {
    const heavierWithMoreSets = sameLiftPersonalBests.filter(
      personalBest =>
        personalBest.weight >= exercise.weight &&
        personalBest.sets >= exercise.sets
    );
    heavierWithMoreSets.forEach(personalBest => {
      if (personalBest.reps >= exercise.reps) {
        ruledOut = true;
      }
    });
  }
  if (!ruledOut) {
    const higherRepsAndSets = sameLiftPersonalBests.filter(
      personalBest =>
        personalBest.reps >= exercise.reps && personalBest.sets >= exercise.sets
    );
    higherRepsAndSets.forEach(personalBest => {
      if (personalBest.weight >= exercise.weight) {
        ruledOut = true;
      }
    });
  }
  const isPersonalBest = !ruledOut;
  return isPersonalBest;
};
