import { alphabetize } from './helpers';

const updateLifts = (newName, oldName, client) => {
  const { lifts, workouts, records, _id } = client;
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
    const mapName = (exercises) =>
      exercises.map((exercise) =>
        exercise.lift === oldName ? { ...exercise, lift: newName } : exercise
      );
    const routine = window.localStorage.getItem(`${_id}`) || [];
    if (routine.length) window.localStorage.setItem(`${_id}`, mapName(routine));
    return {
      lifts: alphabetize(
        lifts.map((lift) => (lift === oldName ? newName : lift))
      ),
      workouts: workouts.length
        ? workouts.map((workout) => mapName(workout.routine))
        : [],
      records: mapName(records),
    };
  }
};

export default updateLifts;
