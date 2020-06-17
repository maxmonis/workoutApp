import isRecord from './isRecord';

const updateRecords = (initialWorkout, initialRecords) => {
  const records = [...initialRecords];
  const updatedRoutine = [];
  const { routine, date } = initialWorkout;
  for (const initialExercise of routine) {
    const exercise = { ...initialExercise };
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
    updatedRoutine.push(exercise);
    if (exercise.becameRecord)
      records.push({
        ...exercise,
        id: exercise.id.split('').reverse().join(''),
      });
  }
  return { workout: { ...initialWorkout, routine }, records };
};

export default updateRecords;
