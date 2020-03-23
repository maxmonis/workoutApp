export default personalBests => {
  const brokenRecords = [];
  const currentPersonalBests = personalBests.filter(
    personalBest => !personalBest.surpassed
  );
  currentPersonalBests.forEach(exercise => {
    const sameLiftPersonalBests = currentPersonalBests.filter(
      personalBest =>
        exercise.id !== personalBest.id && exercise.lift === personalBest.lift
    );
    if (!sameLiftPersonalBests.length) return;
    const heavierWithMoreReps = sameLiftPersonalBests.filter(
      personalBest =>
        personalBest.weight >= exercise.weight &&
        personalBest.reps >= exercise.reps
    );
    heavierWithMoreReps.forEach(personalBest => {
      if (personalBest.sets >= exercise.sets) {
        brokenRecords.push(exercise.id);
      }
    });
    const heavierWithMoreSets = sameLiftPersonalBests.filter(
      personalBest =>
        personalBest.weight >= exercise.weight &&
        personalBest.sets >= exercise.sets
    );
    heavierWithMoreSets.forEach(personalBest => {
      if (personalBest.reps >= exercise.reps) {
        brokenRecords.push(exercise.id);
      }
    });
    const higherRepsAndSets = sameLiftPersonalBests.filter(
      personalBest =>
        personalBest.reps >= exercise.reps && personalBest.sets >= exercise.sets
    );
    higherRepsAndSets.forEach(personalBest => {
      if (personalBest.weight >= exercise.weight) {
        brokenRecords.push(exercise.id);
      }
    });
  });
  return brokenRecords;
};
