const updateRecords = (workout, initialRecords) => {
  const records = [...initialRecords];
  const { routine, date } = workout;
  for (const exercise of routine) {
    const { lift, sets, reps, weight } = exercise;
    let isRecord = true;
    for (const record of records) {
      if (!record.surpassed && record.lift === lift) {
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
          weight >= record.weight
        ) {
          record.surpassed = date;
        }
      }
    }
    if (isRecord) {
      exercise.becameRecord = date;
      records.push({
        ...exercise,
        becameRecord: date,
        id: exercise.id.split('').reverse().join(''),
      });
    } else {
      exercise.becameRecord = null;
    }
  }
  return { records, workout };
};

export default updateRecords;
