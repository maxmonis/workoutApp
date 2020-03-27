import React, { useState, useEffect, useContext, Fragment } from 'react';

import ClientContext from '../../context/client/clientContext';

import uuid from 'uuid/v4';

import BrokenRecordsApp from '../personalBestComponents/BrokenRecordsApp';
import CurrentLiftStats from '../liftComponents/CurrentLiftStats';
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
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const WorkoutApp = ({ selectedClient, initialWorkout }) => {
  const clientContext = useContext(ClientContext);
  const { updateClient, clearFilteredClients } = clientContext;
  const [client, setClient] = useState(selectedClient);
  const { lifts, addLift, removeLift, editLift } = useLiftState(client.lifts);
  const [previousWorkouts, setPreviousWorkouts] = useState(
    client.previousWorkouts
  );
  const { personalBests, updatePersonalBests } = usePersonalBestState(
    client.personalBests
  );

  const {
    currentWorkout,
    resetWorkout,
    reorderWorkout,
    addExercise,
    removeExercise,
    editExercise
  } = useWorkoutState(initialWorkout);

  useEffect(() => {
    clearFilteredClients();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setClient({ ...client, lifts, previousWorkouts, personalBests });
    // eslint-disable-next-line
  }, [lifts, previousWorkouts, personalBests]);
  useEffect(() => {
    updateClient(client);
    // eslint-disable-next-line
  }, [client]);

  const today = new Date().toISOString().slice(0, 10);
  const [workoutDate, setWorkoutDate] = useState(today);
  const [workoutName, setWorkoutName] = useState('');
  const [currentExercise, setCurrentExercise] = useState({
    lift: lifts[0].liftName,
    sets: 1,
    reps: 1,
    weight: 1
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setCurrentExercise({ ...currentExercise, [id]: value });
  };
  const updateWorkoutDate = e => {
    setWorkoutDate(e.target.value);
  };
  const updateWorkoutName = e => {
    setWorkoutName(e.target.value);
  };

  const handleNextExercise = () => {
    addExercise(currentExercise);
  };
  const saveWorkout = () => {
    updatePersonalBests(currentWorkout, workoutDate);
    setPreviousWorkouts([
      {
        id: uuid(),
        name: workoutName,
        date: workoutDate,
        workout: currentWorkout
      },
      ...previousWorkouts
    ]);
    resetWorkout();
    setWorkoutName('');
    closeDialog();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <CssBaseline />
      <main>
        <Typography variant='h3'>{client.name}</Typography>
        <Paper>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '450px',
              padding: '20px'
            }}
          >
            <form>
              <FormControl>
                <ExerciseEntryForm
                  lifts={lifts}
                  handleChange={handleChange}
                  currentExercise={currentExercise}
                />
              </FormControl>
              <Button onClick={openDialog}>Edit Lifts</Button>
              <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={isDialogOpen}
                onClose={closeDialog}
                width={'450px'}
              >
                <DialogContent>
                  <LiftApp
                    lifts={lifts}
                    removeLift={removeLift}
                    editLift={editLift}
                    addLift={addLift}
                  />
                  <Button onClick={closeDialog}>
                    Finished Editing Lifts
                  </Button>
                </DialogContent>
              </Dialog>
              <Button onClick={handleNextExercise} color='primary'>
                Enter
              </Button>
            </form>
            <div style={{ width: '100%' }}>
              {previousWorkouts && previousWorkouts.length > 0 ? (
                <CurrentLiftStats
                  currentClient={client}
                  currentLift={currentExercise.lift}
                  personalBests={personalBests}
                  previousWorkouts={previousWorkouts}
                />
              ) : (
                <Typography variant='h6'>
                  {currentExercise.lift} data will be displayed here once{' '}
                  {client.name} has attempted it
                </Typography>
              )}
            </div>
          </div>
          <div style={{ marginBottom: '50px' }}>
            <CurrentWorkoutApp
              currentWorkout={currentWorkout}
              reorderWorkout={reorderWorkout}
              resetWorkout={resetWorkout}
              removeExercise={removeExercise}
              editExercise={editExercise}
              lifts={lifts}
              workoutName={workoutName}
              workoutDate={workoutDate}
              saveWorkout={saveWorkout}
              updateWorkoutDate={updateWorkoutDate}
              updateWorkoutName={updateWorkoutName}
            />
          </div>
        </Paper>
        <div>
          {previousWorkouts && previousWorkouts.length > 0 && (
            <Fragment>
              <PreviousWorkoutApp previousWorkouts={previousWorkouts} />
              <PersonalBestApp personalBests={personalBests} />
              <BrokenRecordsApp personalBests={personalBests} />
            </Fragment>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkoutApp;
