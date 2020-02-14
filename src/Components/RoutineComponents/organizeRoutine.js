import uuid from 'uuid/v4';

export default exercises => {
  let currentExercise = {};
  let exerciseArray = [];
  for (let i = 0; i < exercises.length; i++) {
    const currentLift = exercises[i].lift;
    const currentSets = exercises[i].sets;
    const currentReps = exercises[i].reps;
    const currentWeight = exercises[i].weight;
    if (i > 0) {
      if (currentLift === exercises[i - 1].lift) {
        exerciseArray.pop();
        if (currentSets > 1) {
          currentExercise.volume += `, ${currentSets}(${currentReps}x${currentWeight})`;
        } else if (currentReps > 1) {
          currentExercise.volume += `, ${currentReps}x${currentWeight}`;
        } else {
          currentExercise.volume += `, ${currentWeight}`;
        }
        exerciseArray.push(currentExercise);
      } else {
        if (currentSets > 1) {
          currentExercise = {
            id: uuid(),
            lift: `${currentLift}: `,
            volume: `${currentSets}(${currentReps}x${currentWeight})`
          };
        } else if (currentReps > 1) {
          currentExercise = {
            id: uuid(),
            lift: `${currentLift}: `,
            volume: `${currentReps}x${currentWeight}`
          };
        } else {
          currentExercise = {
            id: uuid(),
            lift: `${currentLift}: `,
            volume: `${currentWeight}`
          };
        }
        exerciseArray.push(currentExercise);
      }
    } else {
      if (currentSets > 1) {
        currentExercise = {
          id: uuid(),
          lift: `${currentLift}: `,
          volume: `${currentSets}(${currentReps}x${currentWeight})`
        };
      } else if (currentReps > 1) {
        currentExercise = {
          id: uuid(),
          lift: `${currentLift}: `,
          volume: `${currentReps}x${currentWeight}`
        };
      } else {
        currentExercise = {
          id: uuid(),
          lift: `${currentLift}: `,
          volume: `${currentWeight}`
        };
      }
      exerciseArray.push(currentExercise);
    }
  }
  return exerciseArray;
};
