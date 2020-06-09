const updateRecords = (workouts, records) => {
  for (const workout of workouts) {
    const { routine, date } = workout;
    for (const exercise of routine) {
      const { lift, sets, reps, weight } = exercise;
      const liftRecords = records.filter(
        (record) => record.lift === lift && !record.surpassed
      );
      if (!liftRecords.length) exercise.becameRecord = date;
      for (const record of liftRecords) {
        if (
          sets >= record.sets &&
          reps >= record.reps &&
          weight >= record.weight &&
          (sets > record.sets || reps > record.reps || weight > record.weight)
        ) {
          exercise.becameRecord = date;
          record.surpassed = date;
        }
      }
      if (exercise.becameRecord) records.push(exercise);
    }
  }
  return { workouts, records };
};

export default updateRecords;
