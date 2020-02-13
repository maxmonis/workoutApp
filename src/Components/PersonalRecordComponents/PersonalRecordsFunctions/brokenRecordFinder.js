export default (personalRecords, newPR, currentDate) => {
  const brokenRecords = [];
  const lighterWithLessReps = personalRecords.filter(
    personalRecord =>
      newPR.weight >= personalRecord.weight && newPR.reps >= personalRecord.reps
  );
  lighterWithLessReps.forEach(personalRecord => {
    if (newPR.sets >= personalRecord.sets) {
      personalRecord.surpassed = currentDate;
      brokenRecords.push(personalRecord);
    }
  });
  const lighterWithLessSets = personalRecords.filter(
    personalRecord =>
      newPR.weight >= personalRecord.weight && newPR.sets >= personalRecord.sets
  );
  lighterWithLessSets.forEach(personalRecord => {
    if (newPR.reps >= personalRecord.reps) {
      personalRecord.surpassed = currentDate;
      brokenRecords.push(personalRecord);
    }
  });
  const lessRepsAndSets = personalRecords.filter(
    personalRecord =>
      newPR.reps >= personalRecord.reps && newPR.sets >= personalRecord.sets
  );
  lessRepsAndSets.forEach(personalRecord => {
    if (newPR.weight >= personalRecord.weight) {
      personalRecord.surpassed = currentDate;
      brokenRecords.push(personalRecord);
    }
  });
  return brokenRecords;
};

