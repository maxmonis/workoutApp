import uuid from 'uuid/v4';

export default (personalRecords, currentExercise, currentDate) => {
  const currentLift = currentExercise.lift;
  const currentSets = currentExercise.sets;
  const currentReps = currentExercise.reps;
  const currentWeight = currentExercise.weight;
  let ruledOut = false;
  if (!ruledOut) {
    const heavierWithMoreReps = personalRecords.filter(
      personalRecord =>
        personalRecord.weight >= currentWeight &&
        personalRecord.reps >= currentReps
    );
    heavierWithMoreReps.forEach(personalRecord => {
      if (personalRecord.sets >= currentSets) {
        ruledOut = true;
        return;
      }
    });
  }
  if (!ruledOut) {
    const heavierWithMoreSets = personalRecords.filter(
      personalRecord =>
        personalRecord.weight >= currentWeight &&
        personalRecord.sets >= currentSets
    );
    heavierWithMoreSets.forEach(personalRecord => {
      if (personalRecord.reps >= currentReps) {
        ruledOut = true;
        return;
      }
    });
  }
  if (!ruledOut) {
    const higherRepsAndSets = personalRecords.filter(
      personalRecord =>
        personalRecord.reps >= currentReps && personalRecord.sets >= currentSets
    );
    higherRepsAndSets.forEach(personalRecord => {
      if (personalRecord.weight >= currentWeight) {
        ruledOut = true;
        return;
      }
    });
  }
  if (!ruledOut) {
    const currentId = uuid();
    const currentVolume = currentExercise.volume;
    const currentClassification = currentExercise.classification;
    const currentPrintout = currentExercise.printout;
    return {
      id: currentId,
      lift: currentLift,
      sets: currentSets,
      reps: currentReps,
      weight: currentWeight,
      volume: currentVolume,
      classification: currentClassification,
      printout: currentPrintout,
      acheived: currentDate,
      surpassed: false
    };
  }
  return false;
};
