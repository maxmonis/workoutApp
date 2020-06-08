import createNewExercise from './createNewExercise';

const eliminateRedundancy = (workout) => {
  const updatedWorkout = workout.length ? [workout[0]] : [];
  for (let i = 1; i < workout.length; i++) {
    const exercise = workout[i];
    const previous = workout[i - 1];
    const { lift, sets, reps, weight } = exercise;
    if (
      lift === previous.lift &&
      reps === previous.reps &&
      weight === previous.weight
    ) {
      const updatedExercise = createNewExercise({
        ...exercise,
        sets: sets + previous.sets,
      });
      updatedWorkout.splice(-1, 1, updatedExercise);
    } else {
      updatedWorkout.push(exercise);
    }
  }
  return updatedWorkout;
};

export default eliminateRedundancy;
