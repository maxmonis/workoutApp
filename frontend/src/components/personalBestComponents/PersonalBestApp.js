import React, { useState } from 'react';

import alphabetize from '../../functions/alphabetize';
import organizeExercises from '../../functions/organizeExercises';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const PersonalBestApp = ({ personalBests }) => {
  const [numDisplayedPersonalBests, setNumDisplayedPersonalBests] = useState(1);
  const [currentLift, setCurrentLift] = useState('All');
  const currentPersonalBests = organizeExercises(
    alphabetize(
      personalBests.filter(personalBest => !personalBest.surpassed),
      'lift'
    )
  );
  const currentLiftPersonalBests =
    currentLift !== 'All'
      ? currentPersonalBests.filter(
          personalBest => personalBest.lift === currentLift
        )
      : currentPersonalBests;

  const uniqueLiftNames = ['All'];
  const populateUniqueLiftNames = () => {
    currentPersonalBests.forEach(personalBest => {
      if (!uniqueLiftNames.includes(personalBest.lift)) {
        uniqueLiftNames.push(personalBest.lift);
      }
    });
  };
  populateUniqueLiftNames();

  const displayAdditionalPersonalBests = () => {
    const newNumDisplayedPersonalBests = numDisplayedPersonalBests + 1;
    setNumDisplayedPersonalBests(newNumDisplayedPersonalBests);
  };
  const displayFewerPersonalBests = () => {
    const newNumDisplayedPersonalBests = numDisplayedPersonalBests - 1;
    setNumDisplayedPersonalBests(newNumDisplayedPersonalBests);
  };
  const [isDisplayingPersonalBests, setIsDisplayingPersonalBests] = useState(
    false
  );
  const handleViewPersonalBests = () => {
    setIsDisplayingPersonalBests(true);
  };
  const handleHidePersonalBests = () => {
    setCurrentLift('All');
    setIsDisplayingPersonalBests(false);
  };
  const handleChange = e => {
    setCurrentLift(e.target.value);
  };
  if (currentPersonalBests) {
    return (
      <div style={{ width: '450px', marginTop: '20px' }}>
        <Paper style={{ padding: '20px' }}>
          <Button onClick={handleViewPersonalBests}>
            <Select
              style={{ marginLeft: '5px' }}
              native
              labelId='currentLift'
              value={currentLift}
              onChange={handleChange}
              input={<Input id='currentLift' />}
            >
              {uniqueLiftNames.map(lift => (
                <option key={lift} value={lift}>
                  {lift}
                </option>
              ))}
            </Select>{' '}
            Personal Bests
          </Button>
          {isDisplayingPersonalBests && (
            <div>
              {currentLiftPersonalBests.map(personalBest => (
                <div key={personalBest.id}>
                  <Typography variant='h5'>
                    {currentLift === 'All' && `${personalBest.lift}: `}
                    {personalBest.printout}
                  </Typography>
                </div>
              ))}
              {currentLiftPersonalBests.length > numDisplayedPersonalBests &&
                currentLift !== 'All' && (
                  <Button
                    color='primary'
                    onClick={displayAdditionalPersonalBests}
                  >
                    Show additional Personal Bests
                  </Button>
                )}
              {numDisplayedPersonalBests > 1 && (
                <Button color='primary' onClick={displayFewerPersonalBests}>
                  Show fewer Personal Bests
                </Button>
              )}
              <Button onClick={handleHidePersonalBests}>
                Hide Personal Bests
              </Button>
            </div>
          )}
        </Paper>
      </div>
    );
  }
  return null;
};

export default PersonalBestApp;
