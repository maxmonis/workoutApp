import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import clsx from 'clsx';

import CurrentWorkoutApp from './CurrentWorkoutApp';
import DrawerContent from './DrawerContent';
import ExerciseEntryForm from '../ExerciseComponents/ExerciseEntryForm';
import LiftApp from '../LiftComponents/LiftApp';

import checkForBrokenRecords from '../../Functions/checkForBrokenRecords';
import checkForPersonalBest from '../../Functions/checkForPersonalBest';
import useStyles from '../../Functions/useStyles';

import useLiftState from '../../Hooks/useLiftState';
import useWorkoutState from '../../Hooks/useWorkoutState';

import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const date = new Date();
const currentDate = date.toLocaleDateString();

const WorkoutApp = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const defaultLifts = [
    { id: uuid(), liftName: 'Bench Press' },
    { id: uuid(), liftName: 'Deadlift' },
    { id: uuid(), liftName: 'Squat' }
  ];
  const initialLifts =
    JSON.parse(window.localStorage.getItem('lifts')) || defaultLifts;

  const initialCurrentPersonalBests =
    JSON.parse(window.localStorage.getItem('currentPersonalBests')) || [];

  const initialPreviousPersonalBests =
    JSON.parse(window.localStorage.getItem('previousPersonalBests')) || [];

  const initialCurrentWorkout =
    JSON.parse(window.localStorage.getItem('currentWorkout')) || [];

  const initialPreviousWorkouts =
    JSON.parse(window.localStorage.getItem('previousWorkouts')) || [];

  const { lifts, addLift, removeLift, editLift } = useLiftState(initialLifts);

  const {
    currentWorkout,
    reorderWorkout,
    addExercise,
    removeExercise,
    editExercise,
    resetCurrentWorkout
  } = useWorkoutState(initialCurrentWorkout);

  const [currentPersonalBests, setCurrentPersonalBests] = useState(
    initialCurrentPersonalBests
  );

  const [previousPersonalBests, setPreviousPersonalBests] = useState(
    initialPreviousPersonalBests
  );

  const [previousWorkouts, setPreviousWorkouts] = useState(
    initialPreviousWorkouts
  );

  useEffect(() => {
    window.localStorage.setItem('lifts', JSON.stringify(lifts));
  }, [lifts]);

  useEffect(() => {
    window.localStorage.setItem(
      'currentPersonalBests',
      JSON.stringify(currentPersonalBests)
    );
  }, [currentPersonalBests]);

  useEffect(() => {
    window.localStorage.setItem(
      'previousPersonalBests',
      JSON.stringify(previousPersonalBests)
    );
  }, [previousPersonalBests]);

  useEffect(() => {
    window.localStorage.setItem(
      'currentWorkout',
      JSON.stringify(currentWorkout)
    );
  }, [currentWorkout]);

  useEffect(() => {
    window.localStorage.setItem(
      'previousWorkouts',
      JSON.stringify(previousWorkouts)
    );
  }, [previousWorkouts]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentLift, setCurrentLift] = useState(lifts[0].liftName);
  const [currentSets, setCurrentSets] = useState(1);
  const [currentReps, setCurrentReps] = useState(1);
  const [currentWeight, setCurrentWeight] = useState(135);
  const [currentWorkoutName, setCurrentWorkoutName] = useState('');

  const handleChange = e => {
    const { id, value } = e.target;
    switch (id) {
      case 'liftName':
        setCurrentLift(value);
        break;
      case 'numSets':
        setCurrentSets(value);
        break;
      case 'numReps':
        setCurrentReps(value);
        break;
      case 'currentWeight':
        setCurrentWeight(value);
        break;
      case 'workoutName':
        setCurrentWorkoutName(value);
        break;
      default:
        return;
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleNewBrokenRecords = newBrokenRecords => {
    const newPreviousPersonalBests = [];
    currentPersonalBests.forEach(personalBest => {
      if (newBrokenRecords.includes(personalBest.Id)) {
        newPreviousPersonalBests.push(personalBest);
      }
    });
    setPreviousPersonalBests([
      ...newPreviousPersonalBests,
      ...previousPersonalBests
    ]);
    setCurrentPersonalBests(
      currentPersonalBests.filter(
        personalBest => !newBrokenRecords.includes(personalBest.id)
      )
    );
  };

  const handleNewPersonalBests = newPersonalBests => {
    setCurrentPersonalBests([...newPersonalBests, ...currentPersonalBests]);
    const newBrokenRecords = checkForBrokenRecords(currentPersonalBests);
    newBrokenRecords.length && handleNewBrokenRecords(newBrokenRecords);
  };

  const handleNextExercise = () => {
    if (currentWeight < 1) return;
    if (currentSets < 1) setCurrentSets(1);
    if (currentReps < 1) setCurrentReps(1);
    addExercise(currentLift, currentSets, currentReps, currentWeight);
  };

  const handleSaveWorkout = () => {
    const newPersonalBestArray = [];
    currentWorkout.forEach(exercise => {
      const isNewPersonalBest = checkForPersonalBest(
        currentPersonalBests,
        exercise
      );
      if (isNewPersonalBest) {
        exercise.becamePersonalBest = currentDate;
        newPersonalBestArray.push(exercise);
      }
    });
    newPersonalBestArray.length && handleNewPersonalBests(newPersonalBestArray);
    setPreviousWorkouts([
      {
        id: uuid(),
        name: currentWorkoutName,
        date: currentDate,
        workout: currentWorkout
      },
      ...previousWorkouts
    ]);
    resetCurrentWorkout();
    setCurrentWorkoutName('');
    handleCloseDialog();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer
        })}
      >
        <Toolbar>
          <Typography variant='h6' noWrap className={classes.title}>
            maxWellness
          </Typography>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='end'
            onClick={handleOpenDrawer}
            className={clsx(openDrawer && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openDrawer
        })}
      >
        <div className={classes.drawerHeader} />
        <div>
          <form>
            <FormControl>
              <ExerciseEntryForm
                lifts={lifts}
                handleChange={handleChange}
                currentLift={currentLift}
                currentSets={currentSets}
                currentReps={currentReps}
                currentWeight={currentWeight}
              />
            </FormControl>
          </form>
          <Button onClick={handleOpenDialog}>Edit Lifts</Button>

          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={openDialog}
            onClose={handleCloseDialog}
            width={'500px'}
          >
            <DialogContent>
              <LiftApp
                lifts={lifts}
                removeLift={removeLift}
                editLift={editLift}
                addLift={addLift}
              />
              <Button onClick={handleCloseDialog}>
                Finished Editing Lifts
              </Button>
            </DialogContent>
          </Dialog>
          <Button onClick={handleNextExercise} color='primary'>
            Enter
          </Button>
          <div>
            <CurrentWorkoutApp
              currentWorkout={currentWorkout}
              reorderWorkout={reorderWorkout}
              removeExercise={removeExercise}
              editExercise={editExercise}
              lifts={lifts}
              currentWorkoutName={currentWorkoutName}
              handleChange={handleChange}
              handleSaveWorkout={handleSaveWorkout}
            />
          </div>
        </div>
      </main>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='right'
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleCloseDrawer}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <DrawerContent
          previousWorkouts={previousWorkouts}
          currentPersonalBests={currentPersonalBests}
          previousPersonalBests={previousPersonalBests}
        />
      </Drawer>
    </div>
  );
};

export default WorkoutApp;
