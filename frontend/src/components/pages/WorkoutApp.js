import React, { useState, useEffect, useContext } from 'react';

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

const date = new Date();
const currentDate = date.toLocaleDateString();

const WorkoutApp = ({ selectedClient }) => {
  console.log(selectedClient);
  const clientContext = useContext(ClientContext);
  const { updateClient } = clientContext;
  const { lifts, addLift, removeLift, editLift } = useLiftState(
    selectedClient.lifts
  );
  const [previousWorkouts, setPreviousWorkouts] = useState(
    selectedClient.previousWorkouts
  );
  const { personalBests, updatePersonalBests } = usePersonalBestState(
    selectedClient.personalBests
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
    updateClient({ ...selectedClient, lifts: lifts });
    // eslint-disable-next-line
  }, [lifts]);
  useEffect(() => {
    updateClient({
      ...selectedClient,
      previousWorkouts: [currentWorkout, ...previousWorkouts]
    });
    // eslint-disable-next-line
  }, [previousWorkouts]);
  useEffect(() => {
    updateClient({ ...selectedClient, personalBests: personalBests });
    // eslint-disable-next-line
  }, [personalBests]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState({
    lift: lifts[0],
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
          {previousWorkouts.length > 0 && (
            <PreviousWorkoutApp previousWorkouts={previousWorkouts} />
          )}
          {personalBests.length > 0 && (<PersonalBestApp personalBests={personalBests} />)}
        </div>
      </main>
    </div>
  );
};

export default WorkoutApp;
