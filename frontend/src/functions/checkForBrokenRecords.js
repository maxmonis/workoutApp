export default personalBests => {
  const brokenRecords = [];
  const currentPersonalBests = personalBests.filter(
    personalBest => !personalBest.surpassed
  );
  currentPersonalBests.forEach(exercise => {
    const currentLift = exercise.lift;
    const currentSets = exercise.sets;
    const currentReps = exercise.reps;
    const currentWeight = exercise.weight;
    const currentId = exercise.id;
    const currentLiftPersonalBests = currentPersonalBests.filter(
      personalBest =>
        currentId !== personalBest.id && currentLift === personalBest.lift
    );
    const heavierWithMoreReps = currentLiftPersonalBests.filter(
      personalBest =>
        personalBest.weight >= currentWeight && personalBest.reps >= currentReps
    );
    heavierWithMoreReps.forEach(personalBest => {
      if (personalBest.sets >= currentSets) {
        brokenRecords.push(currentId);
      }
    });
    const heavierWithMoreSets = currentLiftPersonalBests.filter(
      personalBest =>
        personalBest.weight >= currentWeight && personalBest.sets >= currentSets
    );
    heavierWithMoreSets.forEach(personalBest => {
      if (personalBest.reps >= currentReps) {
        brokenRecords.push(currentId);
      }
    });
    const higherRepsAndSets = currentLiftPersonalBests.filter(
      personalBest =>
        personalBest.reps >= currentReps && personalBest.sets >= currentSets
    );
    higherRepsAndSets.forEach(personalBest => {
      if (personalBest.weight >= currentWeight) {
        brokenRecords.push(currentId);
      }
    });
  });
  return brokenRecords;
};
