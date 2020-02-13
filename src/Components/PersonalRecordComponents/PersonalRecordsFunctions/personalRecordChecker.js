import multiSetChecker from './multiSetChecker';
import oneSetChecker from './oneSetChecker';
import oneRepChecker from './oneRepChecker';

export default (
  personalRecords,
  currentLift,
  currentSets,
  currentReps,
  currentWeight
) => {
  if (currentSets > 1 && currentReps > 0) {
    return multiSetChecker(
      personalRecords,
      currentLift,
      currentSets,
      currentReps,
      currentWeight
    );
  } else if (currentReps > 1) {
    return oneSetChecker(
      personalRecords,
      currentLift,
      currentReps,
      currentWeight
    );
  } else {
    return oneRepChecker(personalRecords, currentLift, currentWeight);
  }
};
