import { useState } from 'react';

import uuid from 'uuid/v4';

import alphabetize from '../functions/alphabetize';
import checkForDuplicate from '../functions/checkForDuplicate';
import updateLiftName from '../functions/updateLiftName';

const alphabetizeLifts = lifts => {
  return alphabetize(lifts, 'liftName');
};

export default initialLifts => {
  const [lifts, setLifts] = useState(initialLifts);
  return {
    lifts,
    addLift: newLift => {
      const liftIsDuplicate = checkForDuplicate(lifts, 'liftName', newLift);
      if (!newLift || liftIsDuplicate) return;
      setLifts(alphabetizeLifts([...lifts, { id: uuid(), liftName: newLift }]));
    },
    removeLift: liftId => {
      if (lifts.length < 2) return;
      setLifts(alphabetizeLifts(lifts.filter(lift => lift.id !== liftId)));
    },
    editLift: (liftId, newLift) => {
      const liftIsDuplicate = checkForDuplicate(lifts, 'liftName', newLift);
      if (!newLift || liftIsDuplicate) return;
      const originalName = lifts.find(lift => lift.id === liftId).liftName;
      setLifts(
        alphabetizeLifts(
          lifts.map(lift =>
            lift.id === liftId ? { ...lift, liftName: newLift } : lift
          )
        )
      );
      updateLiftName(originalName, newLift);
    }
  };
};
