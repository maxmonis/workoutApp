import createNewExercise from './createNewExercise';

export default currentWorkout => {
  if (currentWorkout.length > 1) {
    const newWorkout = [currentWorkout[0]];
    for (let i = 1; i < currentWorkout.length; i++) {
      const currentExercise = currentWorkout[i];
      const mostRecentExercise = currentWorkout[i - 1];
      if (
        mostRecentExercise.lift === currentExercise.lift &&
        mostRecentExercise.reps === currentExercise.reps &&
        mostRecentExercise.weight === currentExercise.weight
      ) {
        const totalSets = currentExercise.sets + mostRecentExercise.sets;
        const newExercise = createNewExercise({
          lift: currentExercise.lift,
          sets: totalSets,
          reps: currentExercise.reps,
          weight: currentExercise.weight
        });
        newWorkout.pop();
        newWorkout.push(newExercise);
      } else {
        newWorkout.push(currentExercise);
      }
    }
    return newWorkout;
  }
  return currentWorkout;
};
