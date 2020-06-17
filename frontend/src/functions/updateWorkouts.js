import uuid from 'uuid/v4';
import { chronologize } from './helpers';
import updateRecords from './updateRecords';

const updateWorkouts = (value, workouts) => {
  return saveWorkouts(
    typeof value === 'string' ? removeWorkout(value) : addWorkout(value)
  );
  function removeWorkout(workoutId) {
    return workouts.filter((workout) => workout.id !== workoutId);
  }
  function addWorkout(newWorkout) {
    return chronologize([...workouts, { ...newWorkout, id: uuid() }]);
  }
  function saveWorkouts(
    pendingWorkouts,
    updatedWorkouts = [],
    updatedRecords = []
  ) {
    if (!pendingWorkouts.length) return { workouts: [], records: [] };
    const updated = updateRecords(pendingWorkouts[0], updatedRecords);
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

export default updateWorkouts;
