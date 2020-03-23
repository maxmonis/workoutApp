import uuid from 'uuid/v4';

export default exercises => {
  if (!exercises) return;
  let currentExercise = {};
  let organizedExercises = [];
  for (let i = 0; i < exercises.length; i++) {
    const currentLift = exercises[i].lift;
    const currentSets = exercises[i].sets;
    const currentReps = exercises[i].reps;
    const currentWeight = exercises[i].weight;
    if (i > 0) {
      if (currentLift === exercises[i - 1].lift) {
        organizedExercises.pop();
        if (currentSets > 1) {
          currentExercise.printout += `, ${currentSets}(${currentReps}x${currentWeight})`;
        } else if (currentReps > 1) {
          currentExercise.printout += `, ${currentReps}x${currentWeight}`;
        } else {
          currentExercise.printout += `, ${currentWeight}`;
        }
        organizedExercises.push(currentExercise);
      } else {
        if (currentSets > 1) {
          currentExercise = {
            id: uuid(),
            lift: currentLift,
            printout: `${currentSets}(${currentReps}x${currentWeight})`
          };
        } else if (currentReps > 1) {
          currentExercise = {
            id: uuid(),
            lift: currentLift,
            printout: `${currentReps}x${currentWeight}`
          };
        } else {
          currentExercise = {
            id: uuid(),
            lift: currentLift,
            printout: `${currentWeight}`
          };
        }
        organizedExercises.push(currentExercise);
      }
    } else {
      if (currentSets > 1) {
        currentExercise = {
          id: uuid(),
          lift: currentLift,
          printout: `${currentSets}(${currentReps}x${currentWeight})`
        };
      } else if (currentReps > 1) {
        currentExercise = {
          id: uuid(),
          lift: currentLift,
          printout: `${currentReps}x${currentWeight}`
        };
      } else {
        currentExercise = {
          id: uuid(),
          lift: currentLift,
          printout: `${currentWeight}`
        };
      }
      organizedExercises.push(currentExercise);
    }
  }
  return organizedExercises;
};
