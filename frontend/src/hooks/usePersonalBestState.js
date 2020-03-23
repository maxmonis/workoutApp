import { useState } from 'react';

import checkForPersonalBest from '../functions/checkForPersonalBest';
import checkForBrokenRecords from '../functions/checkForBrokenRecords';

const date = new Date();
const currentDate = date.toLocaleDateString();

export default initialPersonalBests => {
  const [personalBests, setPersonalBests] = useState(initialPersonalBests);

  const handleNewBrokenRecords = (updatedPersonalBests, newBrokenRecords) => {
    const personalBestArray = [];
    updatedPersonalBests.forEach(personalBest => {
      if (newBrokenRecords.includes(personalBest.id)) {
        personalBest.surpassed = currentDate;
      }
      personalBestArray.push(personalBest);
    });
    setPersonalBests(personalBestArray);
  };

  const handleNewPersonalBests = newPersonalBests => {
    const updatedPersonalBests = [...newPersonalBests, ...personalBests];
    setPersonalBests(updatedPersonalBests);
    const newBrokenRecords = checkForBrokenRecords(updatedPersonalBests);
    newBrokenRecords.length &&
      handleNewBrokenRecords(updatedPersonalBests, newBrokenRecords);
  };

  return {
    personalBests,
    updatePersonalBests: workout => {
      const newPersonalBests = [];
      workout.forEach(exercise => {
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
