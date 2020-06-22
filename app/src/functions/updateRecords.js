const updateRecords = (workout, initialRecords) => {
  const records = [...initialRecords];
  const { routine, fullDate } = workout;
  const date = fullDate.split(' ')[1];
  for (const initialExercise of routine) {
    const exercise = { ...initialExercise };
    const { lift, sets, reps, weight, printout } = exercise;
    let isRecord = true;
    for (const record of records) {
      if (record.lift === lift && !record.surpassed) {
        if (
          record.sets >= sets &&
          record.reps >= reps &&
          record.weight >= weight
        ) {
          isRecord = false;
          break;
        } else if (
          sets >= record.sets &&
          reps >= record.reps &&
          weight >= record.weight &&
          printout !== record.printout
        ) {
          record.surpassed = date;
        }
      }
    }
    if (isRecord) {
      records.push({
        ...exercise,
        becameRecord: date,
        id: exercise.id.split('').reverse().join(''),
      });
    }
  }
  return records;
};

export default updateRecords;
