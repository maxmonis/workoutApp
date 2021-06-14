const organizeRoutine = (routine = []) => {
  const updatedRoutine = [];
  for (let i = 0; i < routine.length; i++) {
    const { id, lift, printout, becameRecord } = routine[i];
    if (i === 0 || lift !== routine[i - 1].lift) {
      const exercise = {
        id,
        lift,
        printout,
      };
      if (becameRecord) {
        exercise.printout += '*';
      }
      updatedRoutine.push(exercise);
    } else {
      const exercise = updatedRoutine.pop();
      exercise.id += `-${id}`;
      becameRecord
        ? (exercise.printout += `, ${printout}*`)
        : (exercise.printout += `, ${printout}`);
      updatedRoutine.push(exercise);
    }
  }
  return updatedRoutine;
};

export default organizeRoutine;
