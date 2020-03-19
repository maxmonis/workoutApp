import React, { useState } from 'react';

import alphabetize from '../../functions/alphabetize';
import organizeWorkout from '../../functions/organizeWorkout';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const PersonalBestApp = ({ personalBests }) => {
  const [displayedWorkouts, setDisplayedWorkouts] = useState(10);
  const [currentLift, setCurrentLift] = useState(personalBests[0].lift);
  const currentPersonalBests = organizeWorkout(
    alphabetize(
      personalBests.filter(personalBest => !personalBest.surpassed),
      'lift'
    )
  );
  const brokenRecords = personalBests.filter(
    personalBest => personalBest.surpassed
  );
  const getLiftsWithBrokenRecords = brokenRecords => {
    const liftsWithBrokenRecords = [brokenRecords[0].lift];
    for (let i = 1; i < brokenRecords.length; i++) {
      if (!liftsWithBrokenRecords.includes(brokenRecords[i].lift)) {
        liftsWithBrokenRecords.push(brokenRecords[i].lift);
      }
    }
    return liftsWithBrokenRecords;
  };
  const uniqueLifts = getLiftsWithBrokenRecords(brokenRecords);

  const displayAdditionalWorkouts = () => {
    const newDisplayedWorkouts = displayedWorkouts + 3;
    setDisplayedWorkouts(newDisplayedWorkouts);
  };
  const displayFewerWorkouts = () => {
    const newDisplayedWorkouts = displayedWorkouts - 3;
    setDisplayedWorkouts(newDisplayedWorkouts);
  };
  const [isDisplayingBrokenRecords, setIsDisplayingBrokenRecords] = useState(
    false
  );
  const handleChange = e => {
    setCurrentLift(e.target.value);
  };
  const displayBrokenRecords = () => {
    setIsDisplayingBrokenRecords(true);
  };
  const hideBrokenRecords = () => {
    setIsDisplayingBrokenRecords(false);
  };
  if (currentPersonalBests) {
    return (
      <div style={{ width: '450px', marginTop: '20px' }}>
        <Paper style={{ padding: '20px' }}>
          {currentPersonalBests.length > 0 && (
            <div>
              <Typography variant='h4'>Personal Bests</Typography>
              {currentPersonalBests
                .slice(0, displayedWorkouts)
                .map(personalBest => (
                  <Typography variant='h5' key={personalBest.id}>
                    {personalBest.lift}: {personalBest.printout}
                  </Typography>
                ))}
              {currentPersonalBests.length > displayedWorkouts && (
                <Button color='primary' onClick={displayAdditionalWorkouts}>
                  Show additional records
                </Button>
              )}
              {displayedWorkouts > 10 && (
                <Button color='primary' onClick={displayFewerWorkouts}>
                  Show fewer records
                </Button>
              )}
            </div>
          )}
          <Button onClick={displayBrokenRecords}>
            View Broken Records for{' '}
            <Select
              style={{ marginLeft: '5px' }}
              native
              labelId='currentLift'
              value={currentLift}
              onChange={handleChange}
              input={<Input id='currentLift' />}
            >
              {uniqueLifts.map(lift => (
                <option key={lift} value={lift}>
                  {lift}
                </option>
              ))}
            </Select>
          </Button>
          {isDisplayingBrokenRecords && (
            <div>
              <Typography variant='h4'>{currentLift} Broken Records</Typography>
              {brokenRecords
                .filter(brokenRecord => brokenRecord.lift === currentLift)
                .map(formerPersonalBest => (
                  <div key={formerPersonalBest.id}>
                    <Typography variant='h5'>
                      {formerPersonalBest.printout}
                    </Typography>
                    <Typography variant='h6'>
                      {formerPersonalBest.becamePersonalBest}-
                      {formerPersonalBest.surpassed}
                    </Typography>
                  </div>
                ))}
              <Button onClick={hideBrokenRecords}>Hide Broken Records</Button>
            </div>
          )}
        </Paper>
      </div>
    );
  }
  return null;
};

export default PersonalBestApp;
