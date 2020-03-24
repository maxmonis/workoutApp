import { useState } from 'react';

import checkForPersonalBest from '../functions/checkForPersonalBest';
import checkForBrokenRecords from '../functions/checkForBrokenRecords';

export default initialPersonalBests => {
  const [personalBests, setPersonalBests] = useState(initialPersonalBests);

  const handleNewBrokenRecords = (
    updatedPersonalBests,
    newBrokenRecords,
    workoutDate
  ) => {
    const personalBestArray = [];
    updatedPersonalBests.forEach(personalBest => {
      if (newBrokenRecords.includes(personalBest.id)) {
        personalBest.surpassed = workoutDate;
      }
      personalBestArray.push(personalBest);
    });
    setPersonalBests(personalBestArray);
  };

  const handleNewPersonalBests = (newPersonalBests, workoutDate) => {
    const updatedPersonalBests = [...newPersonalBests, ...personalBests];
    setPersonalBests(updatedPersonalBests);
    const newBrokenRecords = checkForBrokenRecords(updatedPersonalBests);
    newBrokenRecords.length &&
      handleNewBrokenRecords(
        updatedPersonalBests,
        newBrokenRecords,
        workoutDate
      );
  };

  return {
    personalBests,
    updatePersonalBests: (workout, workoutDate) => {
      const newPersonalBests = [];
      const previousPersonalBests = personalBests.filter(
        personalBest => personalBest.becamePersonalBest <= workoutDate
      );
      workout.forEach(exercise => {
        const isNewPersonalBest = checkForPersonalBest(
          previousPersonalBests,
          exercise
        );
        if (isNewPersonalBest) {
          exercise.becamePersonalBest = workoutDate;
          newPersonalBests.push(exercise);
        }
      });
      newPersonalBests.length &&
        handleNewPersonalBests(newPersonalBests, workoutDate);
    }
  };
};
