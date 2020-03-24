import React, { useState } from 'react';

import alphabetize from '../../functions/alphabetize';
import organizeExercises from '../../functions/organizeExercises';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const PersonalBestApp = ({ personalBests }) => {
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

  const [isDisplayingPersonalBests, setIsDisplayingPersonalBests] = useState(
    false
  );
  const showPersonalBests = () => {
    setIsDisplayingPersonalBests(true);
  };
  const hidePersonalBests = () => {
    setCurrentLift('All');
    setIsDisplayingPersonalBests(false);
  };
  const handleToggle = () => {
    isDisplayingPersonalBests ? hidePersonalBests() : showPersonalBests();
  };
  const handleChange = e => {
    setCurrentLift(e.target.value);
    !isDisplayingPersonalBests && showPersonalBests();
  };
  if (currentPersonalBests) {
    return (
      <div style={{ width: '450px', marginTop: '20px' }}>
        <Paper style={{ padding: '20px' }}>
          <Button onClick={handleToggle}>
            {isDisplayingPersonalBests ? 'Hide ' : 'Show '}Personal Bests
          </Button>
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
          </Select>
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
              <Button onClick={hidePersonalBests}>Hide Personal Bests</Button>
            </div>
          )}
        </Paper>
      </div>
    );
  }
  return null;
};

export default PersonalBestApp;
