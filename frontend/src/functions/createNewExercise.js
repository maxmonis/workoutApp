import uuid from 'uuid/v4';

export default exercise => {
  const lift = exercise.lift;
  const sets = +exercise.sets > 1 ? +exercise.sets : 1;
  const reps = +exercise.reps > 1 ? +exercise.reps : 1;
  const weight = +exercise.weight > 1 ? +exercise.weight : 1;
  const volume = sets * reps * weight;
  const id = uuid();
  const classification = sets > 1 ? 'multiSet' : reps > 1 ? 'oneSet' : 'oneRep';
  const printout =
    classification === 'multiSet'
      ? `${sets}(${reps}x${weight})`
      : classification === 'oneSet'
      ? `${reps}x${weight}`
      : `${weight}`;
  const newExercise = {
    lift,
    sets,
    reps,
    weight,
    volume,
    id,
    classification,
    printout
  };
  return newExercise;
};
