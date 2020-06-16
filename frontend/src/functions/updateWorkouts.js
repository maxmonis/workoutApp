import uuid from 'uuid/v4';
import updateRecords from './updateRecords';

const updateWorkouts = (value, workouts) => {
  return saveWorkouts(
    typeof value === 'string' ? removeWorkout(value) : addWorkout(value)
  );
  function removeWorkout(workoutId) {
    return workouts.filter((workout) => workout.id !== workoutId);
  }
  function addWorkout(newWorkout) {
    newWorkout.id = uuid();
    return workouts.length &&
      newWorkout.date < workouts[workouts.length - 1].date
      ? chronologize([...workouts, newWorkout])
      : [...workouts, newWorkout];
  }
  function saveWorkouts(
    pendingWorkouts,
    updatedWorkouts = [],
    initialRecords = []
  ) {
    const updated = updateRecords(pendingWorkouts[0], initialRecords);
    return pendingWorkouts.length > 1
      ? saveWorkouts(
          pendingWorkouts.slice(1),
          [...updatedWorkouts, updated.workout],
          updated.records
        )
      : {
          workouts: [...updatedWorkouts, updated.workout],
          records: updated.records,
        };
  }
};

function chronologize(workouts) {
  return workouts.sort((a, b) => a.date - b.date);
}

export default updateWorkouts;
