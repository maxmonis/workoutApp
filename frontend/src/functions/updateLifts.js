import { alphabetize } from './helpers';

const updateLifts = (newName, oldName, client, routine) => {
  const { lifts, workouts, records } = client;
  if (!newName && oldName && lifts.length > 1) {
    return lifts.filter((lift) => lift !== oldName);
  } else if (newName && !lifts.includes(newName)) {
    return !oldName ? alphabetize([...lifts, newName]) : updateName(newName);
  }
  function updateName(newName) {
    const mapName = (exercises) =>
      exercises.map((exercise) =>
        exercise.lift === oldName ? { ...exercise, lift: newName } : exercise
      );
    const updated = [];
    for (const workout of workouts) {
      updated.push({ ...workout, routine: mapName(workout.routine) });
    }
    return {
      lifts: alphabetize(
        lifts.map((lift) => (lift === oldName ? newName : lift))
      ),
      workouts: updated,
      records: mapName(records),
      routine: mapName(routine),
    };
  }
};

export default updateLifts;
