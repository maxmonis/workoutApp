import { alphabetize } from './helpers';

const updateLifts = (newName, oldName, lifts, exercises, workouts, records) => {
  // If newName is '' and oldName isn't the only lift
  if (!newName && oldName && lifts.length > 1) {
    // oldName can safely be deleted
    return lifts.filter((lift) => lift !== oldName);
    // Otherwise if newName is not a duplicate
  } else if (newName && !lifts.includes(newName)) {
    // If no oldName was passed
    return !oldName
      ? // add newName to lifts and sort them alphabetically.
        alphabetize([...lifts, newName])
      : // Otherwise pass newName to updateName
        updateName(newName);
  }
  function updateName(newName) {
    // so it can map newName onto oldName everywhere it appears.
    const mapName = (routine) =>
      routine.map((exercise) =>
        exercise.lift === oldName ? { ...exercise, lift: newName } : exercise
      );
    return {
      lifts: alphabetize(
        lifts.map((lift) => (lift === oldName ? newName : lift))
      ),
      exercises: mapName(exercises),
      workouts: workouts.map((workout) => mapName(workout.routine)),
      records: mapName(records),
    };
  }
};

export default updateLifts;
