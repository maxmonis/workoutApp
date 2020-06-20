const isRecord = (exercise, records) => {
  const { lift, sets, reps, weight } = exercise;
  for (const record of records) {
    if (
      record.lift === lift &&
      record.sets >= sets &&
      record.reps >= reps &&
      record.weight >= weight
    ) {
      return false;
    }
  }
  return true;
};

export default isRecord;
