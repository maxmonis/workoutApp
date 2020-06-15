import uuid from 'uuid/v4';
import updateRecords from './updateRecords';

const updateWorkouts = (value, client) => {
  const { workouts, records } = client;
  if (typeof value === 'string') {
    return saveWorkouts(removeWorkout(value));
  } else {
    return value.id
      ? saveWorkouts(editWorkout(value))
      : saveWorkouts(addWorkout(value));
  }
  function editWorkout(newWorkout) {
    const date = workouts.find((workout) => workout.id === newWorkout.id).date;
    const updatedWorkouts = workouts.map((workout) =>
      workout.id === newWorkout.id ? newWorkout : workout
    );
    return newWorkout.date !== date
      ? chronologize(updatedWorkouts)
      : updatedWorkouts;
  }
  function removeWorkout(workoutId) {
    return workouts.filter((workout) => workout.id !== workoutId);
  }
  function addWorkout(newWorkout) {
    newWorkout.id = uuid();
    return workouts.length &&
      newWorkout.date < workouts[workouts.length - 1].date
      ? chronologize([...workouts, newWorkout])
      : [newWorkout];
  }
  function saveWorkouts(pendingWorkouts) {
    if (pendingWorkouts.length === 1) {
      const updated = updateRecords(pendingWorkouts, records);
      return {
        workouts: [...workouts, updated.workouts[0]],
        records: updated.records,
      };
    }
    return updateRecords(pendingWorkouts, []);
  }
};

function chronologize(workouts) {
  return workouts.sort((a, b) => a.date - b.date);
}

export default updateWorkouts;
