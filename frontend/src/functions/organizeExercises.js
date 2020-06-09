const organizeExercises = (exercises = []) => {
  const organizedExercises = [];
  for (let i = 0; i < exercises.length; i++) {
    const { id, lift, printout } = exercises[i];
    if (i === 0 || lift !== exercises[i - 1].lift) {
      const exercise = {
        id,
        lift,
        printout,
      };
      organizedExercises.push(exercise);
    } else {
      const exercise = organizedExercises.pop();
      exercise.id += `-${id}`;
      exercise.printout += `, ${printout}`;
      organizedExercises.push(exercise);
    }
  }
  return organizedExercises;
};

export default organizeExercises;
