import uuid from 'uuid/v4';
import { chronologize, getDate, getWeekday } from './helpers';
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
            printout: getDate(value.date),
            weekday: getWeekday(value.date),
          },
        ])
  );
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
};

export default updateWorkouts;
