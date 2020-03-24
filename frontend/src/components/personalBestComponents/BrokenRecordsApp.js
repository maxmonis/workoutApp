import React, { useState } from 'react';

import alphabetize from '../../functions/alphabetize';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const BrokenRecords = ({ personalBests }) => {
  const [currentLift, setCurrentLift] = useState('All');
  const brokenRecords = personalBests.filter(
    personalBest => personalBest.surpassed
  );
  const currentLiftBrokenRecords =
    currentLift !== 'All'
      ? brokenRecords.filter(brokenRecord => brokenRecord.lift === currentLift)
      : brokenRecords;

  const uniqueLiftNames = ['All'];
  const sortedLiftNames = alphabetize(
    brokenRecords.map(brokenRecord => brokenRecord.lift)
  );
  for (const liftName of sortedLiftNames) {
    !uniqueLiftNames.includes(liftName) && uniqueLiftNames.push(liftName);
  }

  const [isDisplayingBrokenRecords, setIsDisplayingBrokenRecords] = useState(
    false
  );
  const showBrokenRecords = () => {
    setIsDisplayingBrokenRecords(true);
  };
  const hideBrokenRecords = () => {
    setCurrentLift('All');
    setIsDisplayingBrokenRecords(false);
  };
  const handleToggle = () => {
    isDisplayingBrokenRecords ? hideBrokenRecords() : showBrokenRecords();
  };
  const handleChange = e => {
    setCurrentLift(e.target.value);
    !isDisplayingBrokenRecords && showBrokenRecords();
  };
  if (brokenRecords) {
    return (
      <div style={{ width: '450px', marginTop: '20px', marginBottom: '20px' }}>
        <Paper style={{ padding: '20px' }}>
          <Button onClick={handleToggle}>
            {isDisplayingBrokenRecords ? 'Hide ' : 'Show '}
            Broken Records
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
          {isDisplayingBrokenRecords && (
            <div style={{ marginTop: '20px' }}>
              {currentLiftBrokenRecords.map(brokenRecord => (
                <div key={brokenRecord.id} style={{ marginBottom: '20px' }}>
                  <Typography variant='h5'>
                    {currentLift === 'All' && `${brokenRecord.lift}: `}
                    {brokenRecord.printout}
                  </Typography>
                  <Typography variant='h6'>
                    {brokenRecord.becamePersonalBest}-{brokenRecord.surpassed}
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

export default BrokenRecords;
