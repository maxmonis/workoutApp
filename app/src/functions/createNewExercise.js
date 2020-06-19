import uuid from 'uuid/v4';

const createNewExercise = (exercise) => {
  const id = uuid();
  const { lift } = exercise;
  const sets = getNum(exercise.sets);
  const reps = getNum(exercise.reps);
  const weight = getNum(exercise.weight);
  const printout =
    sets > 1
      ? `${sets}(${reps}x${weight})`
      : reps > 1
      ? `${reps}x${weight}`
      : `${weight}`;
  const newExercise = {
    id,
    lift,
    sets,
    reps,
    weight,
    printout,
  };
  return newExercise;
};

function getNum(value) {
  return parseInt(value) || 1;
}

export default createNewExercise;
