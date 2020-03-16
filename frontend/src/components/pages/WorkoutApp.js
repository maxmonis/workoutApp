import React, { useState, useEffect, useContext } from 'react';

import { Redirect } from 'react-router-dom';

import ClientContext from '../../context/client/clientContext';

import uuid from 'uuid/v4';

import CurrentWorkoutApp from '../workoutComponents/CurrentWorkoutApp';
import ExerciseEntryForm from '../exerciseComponents/ExerciseEntryForm';
import LiftApp from '../liftComponents/LiftApp';
import PreviousWorkoutApp from '../workoutComponents/PreviousWorkoutApp';
import PersonalBestApp from '../personalBestComponents/PersonalBestApp';

import useLiftState from '../../hooks/useLiftState';
import usePersonalBestState from '../../hooks/usePersonalBestState';
import useWorkoutState from '../../hooks/useWorkoutState';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CurrentLiftStats from '../liftComponents/CurrentLiftStats';

const date = new Date();
const currentDate = date.toLocaleDateString();

const WorkoutApp = () => {
  const clientContext = useContext(ClientContext);
  const { currentClient, clearCurrentClient, updateClient } = clientContext;
  const [client, setClient] = useState(currentClient);
  const { lifts, addLift, removeLift, editLift } = useLiftState(client.lifts);
  const [previousWorkouts, setPreviousWorkouts] = useState(
    client.previousWorkouts
  );
  const { personalBests, updatePersonalBests } = usePersonalBestState(
    client.personalBests
  );
  const {
    currentWorkout,
    resetCurrentWorkout,
    reorderCurrentWorkout,
    addExercise,
    removeExercise,
    editExercise
  } = useWorkoutState([]);

  useEffect(() => {
    setClient({ ...client, lifts, previousWorkouts, personalBests });
    // eslint-disable-next-line
  }, [lifts, previousWorkouts, personalBests]);
  useEffect(() => {
    updateClient(client);
    // eslint-disable-next-line
  }, [client]);

  const [redirect, setRedirect] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentWorkoutName, setCurrentWorkoutName] = useState('');
  const [currentExercise, setCurrentExercise] = useState({
    lift: lifts[0].liftName,
    sets: 1,
    reps: 1,
    weight: 135
  });

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleReturnToClients = () => {
    clearCurrentClient();
    setRedirect(true);
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
  if (redirect || !currentClient) {
    return <Redirect to='/' />;
  } else {
    return (
      <div>
        <CssBaseline />
        <main>
          <div style={{ marginTop: '100px' }}>
            <Typography variant='h1'>{currentClient.name}</Typography>
            <Button onClick={handleReturnToClients}>
              Return to Client Roster
            </Button>
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
            {previousWorkouts && previousWorkouts.length > 0 && (
              <CurrentLiftStats
                currentLift={currentExercise.lift}
                personalBests={personalBests}
                previousWorkouts={previousWorkouts}
              />
            )}
            {personalBests && personalBests.length > 0 && (
              <PersonalBestApp
                personalBests={personalBests}
              />
            )}
            {previousWorkouts && previousWorkouts.length > 0 && (
              <PreviousWorkoutApp previousWorkouts={previousWorkouts} />
            )}
          </div>
        </main>
      </div>
    );
  }
};

export default WorkoutApp;
