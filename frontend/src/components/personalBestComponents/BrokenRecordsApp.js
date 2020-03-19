import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const BrokenRecords = ({ personalBests }) => {
  const [numDisplayedBrokenRecords, setNumDisplayedBrokenRecords] = useState(1);
  const [currentLift, setCurrentLift] = useState('All');
  const brokenRecords = personalBests.filter(
    personalBest => personalBest.surpassed
  );
  const currentLiftBrokenRecords =
    currentLift !== 'All'
      ? brokenRecords.filter(brokenRecord => brokenRecord.lift === currentLift)
      : brokenRecords;

  const getLiftsWithBrokenRecords = brokenRecords => {
    const liftsWithBrokenRecords = ['All'];
    for (let i = 0; i < brokenRecords.length; i++) {
      if (!liftsWithBrokenRecords.includes(brokenRecords[i].lift)) {
        liftsWithBrokenRecords.push(brokenRecords[i].lift);
      }
    }
    return liftsWithBrokenRecords;
  };
  const uniqueLifts = getLiftsWithBrokenRecords(brokenRecords);

  const displayAdditionalBrokenRecords = () => {
    const newNumDisplayedBrokenRecords = numDisplayedBrokenRecords + 1;
    setNumDisplayedBrokenRecords(newNumDisplayedBrokenRecords);
  };
  const displayFewerBrokenRecords = () => {
    const newNumDisplayedBrokenRecords = numDisplayedBrokenRecords - 1;
    setNumDisplayedBrokenRecords(newNumDisplayedBrokenRecords);
  };
  const [isDisplayingBrokenRecords, setIsDisplayingBrokenRecords] = useState(
    false
  );
  const handleDisplayBrokenRecords = () => {
    setIsDisplayingBrokenRecords(true);
  };
  const handleHideBrokenRecords = () => {
    setIsDisplayingBrokenRecords(false);
  };
  const handleChange = e => {
    setCurrentLift(e.target.value);
  };
  if (brokenRecords) {
    return (
      <div style={{ width: '450px', marginTop: '20px' }}>
        <Paper style={{ padding: '20px' }}>
          <Button onClick={handleDisplayBrokenRecords}>
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
              <Typography variant='h4'>
                {currentLift !== 'All' && currentLift} Broken Records
              </Typography>
              {currentLiftBrokenRecords.map(brokenRecord => (
                <div key={brokenRecord.id}>
                  <Typography variant='h5'>
                    {currentLift === 'All' && `${brokenRecord.lift}: `}
                    {brokenRecord.printout}
                  </Typography>
                  <Typography variant='h6'>
                    {brokenRecord.becamePersonalBest}-{brokenRecord.surpassed}
                  </Typography>
                </div>
              ))}
              {currentLiftBrokenRecords.length > numDisplayedBrokenRecords && (
                <Button
                  color='primary'
                  onClick={displayAdditionalBrokenRecords}
                >
                  Show additional broken records
                </Button>
              )}
              {numDisplayedBrokenRecords > 1 && (
                <Button color='primary' onClick={displayFewerBrokenRecords}>
                  Show fewer broken records
                </Button>
              )}
              <Button onClick={handleHideBrokenRecords}>
                Hide Broken Records
              </Button>
            </div>
          )}
        </Paper>
      </div>
    );
  }
  return null;
};

export default BrokenRecords;
