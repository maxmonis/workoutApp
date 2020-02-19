export default (personalBests, newPB, currentDate) => {
  const brokenRecords = [];
  const lighterWithLessReps = personalBests.filter(
    personalBest =>
      newPB.weight >= personalBest.weight && newPB.reps >= personalBest.reps
  );
  lighterWithLessReps.forEach(personalBest => {
    if (newPB.sets >= personalBest.sets) {
      personalBest.surpassed = currentDate;
      brokenRecords.push(personalBest);
    }
  });
  const lighterWithLessSets = personalBests.filter(
    personalBest =>
      newPB.weight >= personalBest.weight && newPB.sets >= personalBest.sets
  );
  lighterWithLessSets.forEach(personalBest => {
    if (newPB.reps >= personalBest.reps) {
      personalBest.surpassed = currentDate;
      brokenRecords.push(personalBest);
    }
  });
  const lessRepsAndSets = personalBests.filter(
    personalBest =>
      newPB.reps >= personalBest.reps && newPB.sets >= personalBest.sets
  );
  lessRepsAndSets.forEach(personalBest => {
    if (newPB.weight >= personalBest.weight) {
      personalBest.surpassed = currentDate;
      brokenRecords.push(personalBest);
    }
  });
  return brokenRecords;
};

