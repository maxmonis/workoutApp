import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import brokenRecordFinder from '../PersonalRecordComponents/brokenRecordFinder';
import generateExercise from './generateExercise';
import personalRecordChecker from '../PersonalRecordComponents/personalRecordChecker';
import PersonalRecordApp from '../PersonalRecordComponents/PersonalRecordApp';
import CurrentRoutineApp from '../RoutineComponents/CurrentRoutineApp';
import PreviousRoutineApp from '../RoutineComponents/PreviousRoutineApp';

const date = new Date();
const currentDate = date.toLocaleDateString();

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const WorkoutApp = ({ lifts }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentLift, setCurrentLift] = useState(lifts[0].liftName);
  const [currentSets, setCurrentSets] = useState(1);
  const [currentReps, setCurrentReps] = useState(1);
  const [currentWeight, setCurrentWeight] = useState(135);

  const initialPersonalRecords =
    JSON.parse(window.localStorage.getItem('personalRecords')) || [];

  const [personalRecords, setPersonalRecords] = useState(
    initialPersonalRecords
  );

  useEffect(() => {
    window.localStorage.setItem(
      'personalRecords',
      JSON.stringify(personalRecords)
    );
  }, [personalRecords]);

  const initialCurrentRoutine =
    JSON.parse(window.localStorage.getItem('currentRoutine')) || [];

  const [currentRoutine, setCurrentRoutine] = useState(initialCurrentRoutine);

  useEffect(() => {
    window.localStorage.setItem(
      'currentRoutine',
      JSON.stringify(currentRoutine)
    );
  }, [currentRoutine]);

  const initialPreviousRoutines =
    JSON.parse(window.localStorage.getItem('previousRoutines')) || [];

  const [previousRoutines, setPreviousRoutines] = useState(
    initialPreviousRoutines
  );

  useEffect(() => {
    window.localStorage.setItem(
      'previousRoutines',
      JSON.stringify(previousRoutines)
    );
  }, [previousRoutines]);

  const unbrokenPRs = personalRecords.filter(
    personalRecord => !personalRecord.surpassed
  );
  const currentLiftPRs = unbrokenPRs.filter(
    personalRecord => personalRecord.lift === currentLift
  );

  const handleChange = e => {
    const { id, value } = e.target;
    switch (id) {
      case 'liftName':
        setCurrentLift(value);
        break;
      case 'numSets':
        setCurrentSets(value && parseInt(value));
        break;
      case 'numReps':
        setCurrentReps(value && parseInt(value));
        break;
      case 'numWeight':
        setCurrentWeight(value && parseInt(value));
        break;
      default:
        return;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentLift(lifts[0].liftName);
    setCurrentSets(1);
    setCurrentReps(1);
    setCurrentWeight(135);
    setOpen(false);
  };

  const handleNewPR = newPR => {
    currentLiftPRs.length &&
      brokenRecordFinder(currentLiftPRs, newPR, currentDate);
    setPersonalRecords([newPR, ...personalRecords]);
  };

  const checkForNewPR = currentExercise => {
    const newPR = personalRecordChecker(
      currentLiftPRs,
      currentExercise,
      currentDate
    );
    newPR && handleNewPR(newPR);
  };

  const handleSubmit = () => {
    if (currentWeight < 1) return;
    if (currentSets < 1) setCurrentSets(1);
    if (currentReps < 1) setCurrentReps(1);
    let totalSets = currentSets;
    if (currentRoutine.length) {
      const mostRecentRoutine = currentRoutine[currentRoutine.length - 1];
      if (
        mostRecentRoutine.lift === currentLift &&
        mostRecentRoutine.reps === currentReps &&
        mostRecentRoutine.weight === currentWeight
      ) {
        totalSets += mostRecentRoutine.sets;
        setCurrentRoutine(currentRoutine.pop());
      }
    }
    const currentExercise = generateExercise(
      currentLift,
      totalSets,
      currentReps,
      currentWeight
    );
    setCurrentRoutine([...currentRoutine, currentExercise]);
    checkForNewPR(currentExercise);
    handleClose();
  };

  const handleSaveWorkout = () => {
    setPreviousRoutines([
      { id: uuid(), date: currentDate, routine: currentRoutine },
      ...previousRoutines
    ]);
    setCurrentRoutine([]);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Enter New Exercise</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>New Exercise</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor='currentLift'>Lift</InputLabel>
              <Select
                native
                id='liftName'
                value={currentLift}
                onChange={handleChange}
                input={<Input id='currentLift' />}
              >
                {lifts.map(lift => (
                  <option key={lift.id} value={lift.liftName}>
                    {lift.liftName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id='numSets'
                label='Sets'
                type='number'
                value={currentSets}
                onChange={handleChange}
              />
              <TextField
                id='numReps'
                label='Reps'
                type='number'
                value={currentReps}
                onChange={handleChange}
              />
              <TextField
                required
                id='numWeight'
                label='Weight'
                type='number'
                value={currentWeight}
                onChange={handleChange}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <CurrentRoutineApp currentRoutine={currentRoutine} />
      {currentRoutine.length > 0 && (
        <Button onClick={handleSaveWorkout}>Save Workout</Button>
      )}
      <PreviousRoutineApp previousRoutines={previousRoutines} />
      <PersonalRecordApp personalRecords={personalRecords} />
    </div>
  );
};

export default WorkoutApp;
