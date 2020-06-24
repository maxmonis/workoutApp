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
    return {
      lifts: alphabetize(
        lifts.map((lift) => (lift === oldName ? newName : lift))
      ),
      workouts: workouts.map((workout) => ({
        ...workout,
        routine: mapName(workout.routine),
      })),
      records: mapName(records),
      routine: mapName(routine),
    };
  }
};

export default updateLifts;
