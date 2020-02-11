import { useState } from 'react';
import uuid from 'uuid/v4';

const alphabetizeLifts = lifts => {
  return lifts.sort((a, b) => {
    const textA = a.liftName.toUpperCase();
    const textB = b.liftName.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
};
export default initialLifts => {
  const [lifts, setLifts] = useState(initialLifts);
  return {
    lifts,
    addLift: newLift => {
      setLifts(alphabetizeLifts([...lifts, { id: uuid(), liftName: newLift }]));
    },
    removeLift: liftId => {
      setLifts(alphabetizeLifts(lifts.filter(lift => lift.id !== liftId)));
    },
    editLift: (liftId, newLift) => {
      setLifts(
        alphabetizeLifts(
          lifts.map(lift =>
            lift.id === liftId ? { ...lift, liftName: newLift } : lift
          )
        )
      );
    }
  };
};
