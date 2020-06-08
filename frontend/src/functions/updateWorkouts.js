import { chronologize } from './helpers';
import updateRecords from './updateRecords';
import uuid from 'uuid/v4';

const updateWorkouts = (value, workouts, records) => {
  // ------------------- Dispatcher -------------------
  // If value is a string instead of an object
  if (typeof value === 'string') {
    // that string is the id of a workout flagged for deletion.
    return saveWorkouts(removeWorkout(value));
  } else {
    // If the object already has an id
    return value.id
      ? // it's an updated version of the existing workout with that id.
        saveWorkouts(editWorkout(value))
      : // Otherwise it's a new workout.
        saveWorkouts(addWorkout(value));
  }
  // ------------------- Methods -------------------
  function editWorkout(newWorkout) {
    // It's important to find the original workout so as to compare dates.
    const oldWorkout = workouts.find((workout) => workout.id === newWorkout.id);
    // Map newWorkout onto oldWorkout.
    const updatedWorkouts = workouts.map((workout) =>
      workout.id === oldWorkout.id ? newWorkout : workout
    );
    // If newWorkout's date has been changed
    return newWorkout.date !== oldWorkout.date
      ? // the workouts must be sorted by date.
        chronologize(updatedWorkouts)
      : // Otherwise the order is still correct.
        updatedWorkouts;
  }
  function removeWorkout(workoutId) {
    // Chronology is not impacted by workout removal.
    return workouts.filter((workout) => workout.id !== workoutId);
  }
  function addWorkout(newWorkout) {
    // Add a unique id.
    newWorkout.id = uuid();
    // If newWorkout's date is not later than all others
    return workouts.length &&
      newWorkout.date < workouts[workouts.length - 1].date
      ? // workouts need to be sorted by date.
        chronologize([...workouts, newWorkout])
      : // Otherwise pass saveWorkouts an array of only newWorkout
        [newWorkout];
  }
  function saveWorkouts(pendingWorkouts) {
    // because when newWorkout is the only pendingWorkout
    if (pendingWorkouts.length === 1) {
      // records is still accurate and can be passed to updateRecords
      const updated = updateRecords(pendingWorkouts, records);
      // which returns { workouts, records }
      return {
        // including only that one workout it received
        workouts: [...workouts, updated.workouts[0]],
        // along with an accurate updated records array.
        records: updated.records,
      };
    }
    // Otherwise records must be recalculated entirely starting from [].
    return updateRecords(pendingWorkouts, []);
  }
};

function chronologize(workouts) {
  // Sort workouts from earliest date to latest date.
  return workouts.sort((a, b) => a.date - b.date);
}

export default updateWorkouts;
