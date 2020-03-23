import createNewExercise from './createNewExercise';

export default workout => {
  if (workout.length > 1) {
    const updatedWorkout = [workout[0]];
    for (let i = 1; i < workout.length; i++) {
      const currentExercise = workout[i];
      const mostRecentExercise = workout[i - 1];
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
        updatedWorkout.pop();
        updatedWorkout.push(newExercise);
      } else {
        updatedWorkout.push(currentExercise);
      }
    }
    return updatedWorkout;
  }
  return workout;
};
