import createCurrentExercise from './createCurrentExercise';

export default currentWorkout => {
  if (currentWorkout.length < 2) return currentWorkout;
  const updatedWorkout = [currentWorkout[0]];
  for (let i = 1; i < currentWorkout.length; i++) {
    const currentExercise = currentWorkout[i];
    const mostRecentExercise = currentWorkout[i - 1];
    if (
      mostRecentExercise.lift === currentExercise.lift &&
      mostRecentExercise.reps === currentExercise.reps &&
      mostRecentExercise.weight === currentExercise.weight
    ) {
      const totalSets =
        parseInt(currentExercise.sets) + parseInt(mostRecentExercise.sets);
      const updatedExercise = createCurrentExercise(
        currentExercise.lift,
        totalSets,
        currentExercise.reps,
        currentExercise.weight
      );
      updatedWorkout.pop();
      updatedWorkout.push(updatedExercise);
    } else {
      updatedWorkout.push(currentExercise);
    }
  }
  return updatedWorkout;
};
