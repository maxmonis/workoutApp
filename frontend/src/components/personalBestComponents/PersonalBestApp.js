import React, { useState } from 'react';

import alphabetize from '../../functions/alphabetize';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const PersonalBestApp = ({ personalBests }) => {
  const [currentLift, setCurrentLift] = useState('All');
  const currentPersonalBests = personalBests.filter(
    personalBest => !personalBest.surpassed
  );

  const currentLiftPersonalBests =
    currentLift !== 'All'
      ? currentPersonalBests.filter(
          personalBest => personalBest.lift === currentLift
        )
      : currentPersonalBests;

  const uniqueLiftNames = ['All'];
  const sortedLiftNames = alphabetize(
    currentPersonalBests.map(personalBest => personalBest.lift)
  );
  for (const liftName of sortedLiftNames) {
    !uniqueLiftNames.includes(liftName) && uniqueLiftNames.push(liftName);
  }

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
            style={{ marginLeft: '5px', width: '150px' }}
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
            <div style={{ marginTop: '20px' }}>
              {currentLiftPersonalBests.map(personalBest => (
                <div key={personalBest.id} style={{ marginBottom: '20px' }}>
                  <Typography variant='h5'>
                    {currentLift === 'All' && `${personalBest.lift}: `}
                    {personalBest.printout}
                  </Typography>
                  <Typography variant='h6'>
                    {personalBest.becamePersonalBest}
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
