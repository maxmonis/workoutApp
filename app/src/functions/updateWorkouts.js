import uuid from 'uuid/v4';
import updateRecords from './updateRecords';

const updateWorkouts = (value, workouts) =>
  saveWorkouts(
    typeof value === 'string'
      ? workouts.filter((workout) => workout.id !== value)
      : value.id && workouts.some((workout) => workout.id === value.id)
      ? chronologize(
          workouts.map((workout) =>
            workout.id === value.id
              ? { ...value, fullDate: getFullDate(value.date) }
              : workout
          )
        )
      : chronologize([
          ...workouts,
          {
            ...value,
            id: uuid(),
            fullDate: getFullDate(value.date),
          },
        ])
  );

function saveWorkouts(pending, workouts = [], records = []) {
  if (!pending.length) return { workouts, records };
  const workout = pending.shift();
  const updated = updateRecords(workout, records);
  return saveWorkouts(pending, [...workouts, workout], updated);
}

function chronologize(array) {
  return array.sort((a, b) => {
    const dateA = parseInt(a.date.replace(/-/g, ''));
    const dateB = parseInt(b.date.replace(/-/g, ''));
    return dateA - dateB;
  });
}

function getFullDate(date) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const weekday = days[new Date(`${date.replace(/-/g, '/')}`).getDay()];
  const year = date.slice(2, 4);
  const month = parseInt(date.slice(5, 7));
  const day = parseInt(date.slice(8));
  return `${weekday} ${month}/${day}/${year}`;
}

export default updateWorkouts;
