import createNewExercise from './createNewExercise';

const eliminateRedundancy = (routine) => {
  const updatedRoutine = routine.length ? [routine[0]] : [];
  for (let i = 1; i < routine.length; i++) {
    const exercise = routine[i];
    const previous = routine[i - 1];
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
      updatedRoutine.splice(-1, 1, updatedExercise);
    } else {
      updatedRoutine.push(exercise);
    }
  }
  return updatedRoutine;
};

export default eliminateRedundancy;
