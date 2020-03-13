import { useState } from 'react';

import checkForPersonalBest from '../functions/checkForPersonalBest';
import checkForBrokenRecords from '../functions/checkForBrokenRecords';

const date = new Date();
const currentDate = date.toLocaleDateString();

export default initialPersonalBests => {
  const [personalBests, setPersonalBests] = useState(initialPersonalBests);

  const handleNewBrokenRecords = (personalBests, newBrokenRecords) => {
    const updatedPersonalBests = [];
    personalBests.forEach(personalBest => {
      if (newBrokenRecords.includes(personalBest.id)) {
        personalBest.surpassed = currentDate;
      }
      updatedPersonalBests.push(personalBest);
    });
    setPersonalBests(updatedPersonalBests);
  };

  const handleNewPersonalBests = newPersonalBests => {
    const newBrokenRecords = checkForBrokenRecords([
      ...newPersonalBests,
      ...personalBests
    ]);
    setPersonalBests([...newPersonalBests, ...personalBests]);
    newBrokenRecords.length &&
      handleNewBrokenRecords(
        [...newPersonalBests, ...personalBests],
        newBrokenRecords
      );
  };

  return {
    personalBests,
    updatePersonalBests: currentWorkout => {
      const newPersonalBests = [];
      currentWorkout.forEach(exercise => {
        const isNewPersonalBest = checkForPersonalBest(personalBests, exercise);
        if (isNewPersonalBest) {
          exercise.becamePersonalBest = currentDate;
          newPersonalBests.push(exercise);
        }
      });
      newPersonalBests.length && handleNewPersonalBests(newPersonalBests);
    }
  };
};
