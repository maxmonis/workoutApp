import createNewExercise from './createNewExercise';

const UpdateRoutine = (value, routine) =>
  typeof value === 'string'
    ? routine.filter(exercise => exercise.id !== value)
    : value.lift
    ? [...routine, createNewExercise(value)]
    : typeof value[0] === 'string'
    ? reorderExercises(value, routine)
    : value;

function reorderExercises(exerciseIds, routine) {
  const updatedRoutine = [];
  for (const exerciseId of exerciseIds) {
    for (const exercise of routine) {
      if (exercise.id === exerciseId) {
        updatedRoutine.push(exercise);
        break;
      }
    }
  }
  return updatedRoutine;
}

export default UpdateRoutine;
