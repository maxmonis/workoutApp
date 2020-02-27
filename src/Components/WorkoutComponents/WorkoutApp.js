import React, { useState, useEffect } from 'react';

import uuid from 'uuid/v4';

import CurrentWorkoutApp from './CurrentWorkoutApp';
import ExerciseEntryForm from '../exerciseComponents/ExerciseEntryForm';
import LiftApp from '../liftComponents/LiftApp';
import PreviousWorkoutApp from './PreviousWorkoutApp';
import PersonalBestApp from '../personalBestComponents/PersonalBestApp';

import useLiftState from '../../hooks/useLiftState';
import usePersonalBestState from '../../hooks/usePersonalBestState';
import useWorkoutState from '../../hooks/useWorkoutState';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';

const date = new Date();
const currentDate = date.toLocaleDateString();

const WorkoutApp = () => {
  const defaultLifts = [
    { id: uuid(), liftName: 'Bench Press' },
    { id: uuid(), liftName: 'Deadlift' },
    { id: uuid(), liftName: 'Squat' }
  ];

  const initialLifts =
    JSON.parse(window.localStorage.getItem('lifts')) || defaultLifts;

  const initialCurrentWorkout =
    JSON.parse(window.localStorage.getItem('currentWorkout')) || [];

  const initialPreviousWorkouts =
    JSON.parse(window.localStorage.getItem('previousWorkouts')) || [];

  const initialPersonalBests =
    JSON.parse(window.localStorage.getItem('personalBests')) || [];

  const { lifts, addLift, removeLift, editLift } = useLiftState(initialLifts);

  const {
    currentWorkout,
    resetCurrentWorkout,
    reorderCurrentWorkout,
    addExercise,
    removeExercise,
    editExercise
  } = useWorkoutState(initialCurrentWorkout);

  const [previousWorkouts, setPreviousWorkouts] = useState(
    initialPreviousWorkouts
  );

  const { personalBests, updatePersonalBests } = usePersonalBestState(
    initialPersonalBests
  );

  useEffect(() => {
    window.localStorage.setItem('lifts', JSON.stringify(lifts));
  }, [lifts]);

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

  useEffect(() => {
    window.localStorage.setItem('personalBests', JSON.stringify(personalBests));
  }, [personalBests]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState({
    lift: lifts[0].liftName,
    sets: 1,
    reps: 1,
    weight: 135
  });
  const [currentWorkoutName, setCurrentWorkoutName] = useState('');

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChange = e => {
    const { id, value } = e.target;
    id !== 'workoutName'
      ? setCurrentExercise({ ...currentExercise, [id]: value })
      : setCurrentWorkoutName(value);
  };

  const handleNextExercise = () => {
    if (currentExercise.weight < 1) return;
    addExercise(currentExercise);
  };

  const handleSaveWorkout = () => {
    updatePersonalBests(currentWorkout);
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
    <div>
      <CssBaseline />
      <main>
        <div style={{ marginTop: '100px' }}>
          <form>
            <FormControl>
              <ExerciseEntryForm
                lifts={lifts}
                handleChange={handleChange}
                currentExercise={currentExercise}
              />
            </FormControl>
          </form>
          <Button onClick={handleOpenDialog}>Edit Lifts</Button>

          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={isDialogOpen}
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
              reorderCurrentWorkout={reorderCurrentWorkout}
              removeExercise={removeExercise}
              editExercise={editExercise}
              lifts={lifts}
              currentWorkoutName={currentWorkoutName}
              handleChange={handleChange}
              handleSaveWorkout={handleSaveWorkout}
            />
          </div>
          <PreviousWorkoutApp previousWorkouts={previousWorkouts} />
          <PersonalBestApp personalBests={personalBests} />
        </div>
      </main>
    </div>
  );
};

export default WorkoutApp;
