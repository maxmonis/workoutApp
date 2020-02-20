import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import clsx from 'clsx';

import PersonalBestApp from '../PersonalBestComponents/PersonalBestApp';
import CurrentWorkoutApp from './CurrentWorkoutApp';
import LiftApp from '../LiftComponents/LiftApp';
import PreviousWorkoutApp from './PreviousWorkoutApp';
import ExerciseEntryForm from '../ExerciseComponents/ExerciseEntryForm';

import checkForPersonalBests from '../../Functions/checkForPersonalBests';
import checkForBrokenRecords from '../../Functions/checkForBrokenRecords';

import useLiftState from '../../Hooks/useLiftState';
import useWorkoutState from '../../Hooks/useWorkoutState';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const date = new Date();
const currentDate = date.toLocaleDateString();

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }
}));

const WorkoutApp = () => {
  const classes = useStyles();
  const theme = useTheme();

  const defaultLifts = [
    { id: uuid(), liftName: 'Bench Press' },
    { id: uuid(), liftName: 'Deadlift' },
    { id: uuid(), liftName: 'Squat' }
  ];
  const initialLifts =
    JSON.parse(window.localStorage.getItem('lifts')) || defaultLifts;

  const initialPersonalBests =
    JSON.parse(window.localStorage.getItem('personalBests')) || [];

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

  const [personalBests, setPersonalBests] = useState(initialPersonalBests);

  const [previousWorkouts, setPreviousWorkouts] = useState(
    initialPreviousWorkouts
  );

  useEffect(() => {
    window.localStorage.setItem('lifts', JSON.stringify(lifts));
  }, [lifts]);

  useEffect(() => {
    window.localStorage.setItem('personalBests', JSON.stringify(personalBests));
  }, [personalBests]);

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
        setCurrentSets(value && parseInt(value));
        break;
      case 'numReps':
        setCurrentReps(value && parseInt(value));
        break;
      case 'currentWeight':
        setCurrentWeight(value && parseInt(value));
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

  const handleNewPersonalBest = newPersonalBest => {
    setPersonalBests([newPersonalBest, ...personalBests]);
    if (personalBests.length > 0) {
      checkForBrokenRecords(personalBests, newPersonalBest, currentDate);
    }
  };

  const handleNextExercise = () => {
    if (currentWeight < 1) return;
    if (currentSets < 1) setCurrentSets(1);
    if (currentReps < 1) setCurrentReps(1);
    addExercise(currentLift, currentSets, currentReps, currentWeight);
  };

  const handleSaveWorkout = () => {
    currentWorkout.forEach(exercise => {
      const currentExercise = checkForPersonalBests(
        personalBests,
        currentDate,
        exercise
      );
      currentExercise.becamePersonalBest &&
        handleNewPersonalBest(currentExercise);
    });
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
                currentWeight
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
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key='Previous Workouts'>
            <ListItemIcon>
              <span role='img' aria-label='weightlifter'>
                🏋️
              </span>
            </ListItemIcon>
            <ListItemText primary='Previous Workouts' />
          </ListItem>
          <ListItem button key='Personal Bests'>
            <ListItemIcon>
              <span role='img' aria-label='flexed arm'>
                💪
              </span>
            </ListItemIcon>
            <ListItemText primary='Personal Bests' />
          </ListItem>
        </List>
        <Divider />
        <PreviousWorkoutApp previousWorkouts={previousWorkouts} />
        <PersonalBestApp personalBests={personalBests} />
      </Drawer>
    </div>
  );
};

export default WorkoutApp;
