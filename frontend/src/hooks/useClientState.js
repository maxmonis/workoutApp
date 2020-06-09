import { useState } from 'react';
import { capitalize } from '../functions/helpers';
import eliminateRedundancy from '../functions/eliminateRedundancy';
import updateExercises from '../functions/updateExercises';
import updateLifts from '../functions/updateLifts';
import updateWorkouts from '../functions/updateWorkouts';

const useClientState = (initialClient) => {
  const [client, setClient] = useState(initialClient);
  const { lifts, exercises, workouts, records } = client;
  return {
    client,
    updateLifts: (newName, oldName) => {
      const updated = updateLifts(
        capitalize(newName),
        oldName,
        lifts,
        exercises,
        workouts,
        records
      );
      if (updated) {
        if (updated.length) {
          setClient({ ...client, lifts: updated });
        } else {
          const { lifts, exercises, workouts, records } = updated;
          setClient({ ...client, lifts, exercises, workouts, records });
        }
      }
    },
    updateExercises: (value) =>
      setClient({
        ...client,
        exercises: eliminateRedundancy(updateExercises(value, exercises)),
      }),
    updateWorkouts: (value) => {
      const updated = updateWorkouts(value, workouts, records);
      const { workouts, records } = updated;
      setClient({ ...client, workouts, records });
    },
  };
};

export default useClientState;
