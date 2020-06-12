const organizeRoutine = (routine = []) => {
  const updatedRoutine = [];
  for (let i = 0; i < routine.length; i++) {
    const { id, lift, printout } = routine[i];
    if (i === 0 || lift !== routine[i - 1].lift) {
      const exercise = {
        id,
        lift,
        printout,
      };
      updatedRoutine.push(exercise);
    } else {
      const exercise = updatedRoutine.pop();
      exercise.id += `-${id}`;
      exercise.printout += `, ${printout}`;
      updatedRoutine.push(exercise);
    }
  }
  return updatedRoutine;
};

export default organizeRoutine;
