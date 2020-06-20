import uuid from 'uuid/v4';
import updateRecords from './updateRecords';

const updateWorkouts = (value, workouts) => {
  return saveWorkouts(
    typeof value === 'string'
      ? workouts.filter((workout) => workout.id !== value)
      : chronologize([
          ...workouts,
          {
            ...value,
            id: uuid(),
            fullDate: getFullDate(value.date),
          },
        ])
  );
};

function saveWorkouts(
  pendingWorkouts,
  updatedWorkouts = [],
  updatedRecords = []
) {
  if (!pendingWorkouts.length) return { workouts: [], records: [] };
  const { workout, records } = updateRecords(
    pendingWorkouts[0],
    updatedRecords
  );
  return pendingWorkouts.length > 1
    ? saveWorkouts(
        pendingWorkouts.slice(1),
        [...updatedWorkouts, workout],
        records
      )
    : {
        workouts: [...updatedWorkouts, workout],
        records: records,
      };
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
  const year = date.slice(0, 4);
  const month = parseInt(date.slice(5, 7));
  const day = parseInt(date.slice(8));
  return `${weekday} ${month}/${day}/${year.slice(2)}`;
}

export default updateWorkouts;
