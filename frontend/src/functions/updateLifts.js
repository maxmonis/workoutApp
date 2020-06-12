import { alphabetize } from './helpers';

const updateLifts = (newName, oldName, client) => {
  const { lifts, workouts, records, _id } = client;
  if (!newName && oldName && lifts.length > 1) {
    return lifts.filter((lift) => lift !== oldName);
    } else if (newName && !lifts.includes(newName)) {
    return !oldName
      ? alphabetize([...lifts, newName])
      : updateName(newName);
  }
  function updateName(newName) {
     const mapName = (exercises) =>
      exercises.map((exercise) =>
        exercise.lift === oldName ? { ...exercise, lift: newName } : exercise
      );
    const routine = JSON.parse(window.localStorage.getItem(`${_id}`)) || [];
    if (routine.length) {
      window.localStorage.setItem(`${_id}`, JSON.stringify(mapName(routine)));
    }
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
