const updateRecords = (workout, initialRecords) => {
  const records = [...initialRecords];
  const { routine, fullDate } = workout;
  const date = fullDate.split(' ')[1];
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
