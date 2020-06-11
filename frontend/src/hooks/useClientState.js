import { useState } from 'react';
import { capitalize } from '../functions/helpers';
import updateLifts from '../functions/updateLifts';
import updateWorkouts from '../functions/updateWorkouts';

const useClientState = (initialClient) => {
  const [client, setClient] = useState(initialClient);
  return {
    client,
    updateLifts: (newName, oldName) => {
      const updated = updateLifts(
        capitalize(newName),
        oldName,
        client.lifts,
        client.workouts,
        client.records
      );
      if (updated) {
        if (updated.length) {
          setClient({ ...client, lifts: updated });
        } else {
          const { lifts, workouts, records } = updated;
          setClient({ ...client, lifts, workouts, records });
        }
      }
    },
    updateWorkouts: (value) => {
      const updated = updateWorkouts(value, client.workouts, client.records);
      const { workouts, records } = updated;
      setClient({ ...client, workouts, records });
    },
  };
};

export default useClientState;
