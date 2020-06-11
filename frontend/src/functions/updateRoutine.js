import createNewExercise from './createNewExercise';

const UpdateRoutine = (value, exercises) => {
  // ------------------- Dispatcher -------------------
  // If value is a string
  if (typeof value === 'string') {
    // it's the id of an exercise flagged for deletion.
    return removeExercise(value);
    // Otherwise, if it's an object instead of an array.
  } else if (value.length === undefined) {
    // If the object already has an id
    return value.id
      ? // it's an updated version of the existing exercise with that id.
        editExercise(value)
      : // Otherwise, it's a new exercise.
        addExercise(value);
  } else {
    // The array contains exercise ids
    return reorderExercises(value);
  }
  // ------------------- Methods -------------------
  function reorderExercises(exerciseIds) {
    // in an updated order after a drag and drop event.
    const reorderedExercises = [];
    // For each exercise id
    for (const exerciseId of exerciseIds) {
      // find the corresponding exercise
      for (const exercise of exercises) {
        if (exercise.id === exerciseId) {
          // and add it to the updated exercise array.
          reorderedExercises.push(exercise);
          break;
        }
      }
    }
    return reorderedExercises;
  }
  function addExercise(newExercise) {
    return [...exercises, createNewExercise(newExercise)];
  }
  function editExercise(updatedExercise) {
    // It's important to save the original id
    const exerciseId = updatedExercise.id;
    // because createNewExercise generates a new object with a new id.
    const newExercise = createNewExercise(updatedExercise);
    return exercises.map((exercise) =>
      exercise.id === exerciseId ? newExercise : exercise
    );
  }
  function removeExercise(exerciseId) {
    return exercises.filter((exercise) => exercise.id !== exerciseId);
  }
};

export default UpdateRoutine;
