export default (client, originalName, updatedName) => {
  const currentWorkout = client.currentWorkout.forEach((exercise) => {
    if (exercise.lift === originalName) exercise.lift = updatedName;
  });
  const previousWorkouts = client.previousWorkouts.forEach(
    (previousWorkout) => {
      previousWorkout.workout.forEach((exercise) => {
        if (exercise.lift === originalName) exercise.lift = updatedName;
      });
    }
  );
  const personalBests = client.personalBests.forEach((exercise) => {
    if (exercise.lift === originalName) exercise.lift = updatedName;
  });
  const updatedClient = {
    ...client,
    currentWorkout,
    previousWorkouts,
    personalBests,
  };
  return updatedClient;
};
