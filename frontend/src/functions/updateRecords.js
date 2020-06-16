import isRecord from './isRecord';

const updateRecords = (workout, records = []) => {
  const { routine, date } = workout;
  for (const exercise of routine) {
    if (isRecord(exercise, records)) {
      exercise.becameRecord = date;
      const { lift, sets, reps, weight } = exercise;
      for (const record of records) {
        if (
          lift === record.lift &&
          sets >= record.sets &&
          reps >= record.reps &&
          weight >= record.weight
        ) {
          record.surpassed = date;
        }
      }
    }
    if (exercise.becameRecord)
      records.push({
        ...exercise,
        id: exercise.id.split('').reverse().join(''),
      });
  }
  return { workout, records };
};

export default updateRecords;
