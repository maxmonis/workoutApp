import uuid from 'uuid/v4';
import updateRecords from './updateRecords';

const updateWorkouts = (value, workouts) =>
  saveWorkouts(
    typeof value === 'string'
      ? workouts.filter(workout => workout.id !== value)
      : value.id && workouts.some(workout => workout.id === value.id)
      ? chronologize(
          workouts.map(workout => (workout.id === value.id ? value : workout))
        )
      : chronologize([
          ...workouts,
          {
            ...value,
            id: uuid(),
          },
        ])
  );

function saveWorkouts(pending, workouts = [], records = []) {
  if (!pending.length) return { workouts, records };
  const workout = pending.shift();
  const updated = updateRecords(workout, records);
  return saveWorkouts(pending, [...workouts, updated.workout], updated.records);
}

function chronologize(array) {
  return array.sort((a, b) => {
    const dateA = parseInt(a.date.replace(/-/g, ''));
    const dateB = parseInt(b.date.replace(/-/g, ''));
    return dateA - dateB;
  });
}

export default updateWorkouts;
