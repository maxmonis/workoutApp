import { useState } from 'react';
import { capitalize } from '../functions/helpers';
import eliminateRedundancy from '../functions/eliminateRedundancy';
import updateLifts from '../functions/updateLifts';
import updateRoutine from '../functions/updateRoutine';
import updateWorkouts from '../functions/updateWorkouts';

const useClientState = (initialClient) => {
  const [client, setClient] = useState(initialClient);
  const defaultRoutine =
    JSON.parse(window.localStorage.getItem(`${client._id}`)) || [];
  const [routine, setRoutine] = useState(defaultRoutine);
  const saveRoutine = (updated) => {
    window.localStorage.setItem(`${client._id}`, JSON.stringify(updated));
    setRoutine(updated);
  };
  return {
    client,
    routine,
    updateRoutine: (value) =>
      saveRoutine(eliminateRedundancy(updateRoutine(value, routine))),
    updateLifts: (newName, oldName) => {
      const updated = updateLifts(capitalize(newName), oldName, client);
      if (updated) {
        if (updated.length) {
          setClient({ ...client, lifts: updated });
        } else {
          saveRoutine(updated.routine);
          const { lifts, workouts, records } = updated;
          setClient({ ...client, lifts, workouts, records });
        }
      }
    },
    updateWorkouts: (value) => {
      const updated = updateWorkouts(value, client);
      const { workouts, records } = updated;
      setClient({ ...client, workouts, records });
    },
  };
};

export default useClientState;
