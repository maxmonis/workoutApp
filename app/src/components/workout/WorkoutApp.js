import React, { useState, useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NewWorkout from './NewWorkout';
import StatsApp from '../stats/StatsApp';
import LiftApp from '../lift/LiftApp';
import useClientState from '../../hooks/useClientState';
import useToggle from '../../hooks/useToggle';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      md: 750,
    },
  },
});

const WorkoutApp = ({ selectedClient, updateClient }) => {
  const {
    client,
    routine,
    updateRoutine,
    updateLifts,
    updateWorkouts,
  } = useClientState(selectedClient);
  const { lifts, workouts, records } = client;
  const defaultExercise = {
    lift: lifts[0],
    sets: '',
    reps: '',
    weight: '',
  };
  const [exercise, setExercise] = useState(defaultExercise);
  const defaultWorkout = {
    name: '',
    date: new Date().toISOString().slice(0, 10),
  };
  const [workout, setWorkout] = useState(defaultWorkout);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [isFormOpen, toggle] = useToggle(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'name' || id === 'date') {
      editingWorkout
        ? setEditingWorkout({ ...editingWorkout, [id]: value })
        : setWorkout({ ...workout, [id]: value });
    } else {
      value === '#' ? toggle() : setExercise({ ...exercise, [id]: value });
    }
  };
  const selectExercise = (exercise) => {
    setExercise(exercise);
    updateRoutine(exercise.id);
  };
  const selectWorkout = (workout) => {
    if (workout) {
      setEditingWorkout(workout);
      updateRoutine(workout.routine);
    } else {
      setEditingWorkout(null);
    }
  };
  const saveWorkout = () => {
    const updated = editingWorkout
      ? { ...editingWorkout, routine }
      : { ...workout, routine };
    updateWorkouts(updated);
    setExercise(defaultExercise);
    setWorkout(defaultWorkout);
    setEditingWorkout(null);
    updateRoutine([]);
  };
  useEffect(() => {
    updateClient(client);
    // eslint-disable-next-line
  }, [client]);
  return (
    <ThemeProvider theme={theme}>
      <Typography variant='h3'>{client.name}</Typography>
      <div>
        {isFormOpen ? (
          <LiftApp lifts={lifts} updateLifts={updateLifts} toggle={toggle} />
        ) : (
          <Grid container direction='row' className='container'>
            <Grid item xs={12} md={workouts.length ? 6 : 12}>
              <NewWorkout
                exercise={exercise}
                workout={editingWorkout ? editingWorkout : workout}
                lifts={lifts}
                routine={routine}
                workouts={workouts}
                handleChange={handleChange}
                saveWorkout={saveWorkout}
                updateRoutine={updateRoutine}
                selectExercise={selectExercise}
                setExercise={setExercise}
              />
            </Grid>
            {workouts.length > 0 && (
              <Grid item xs={12} md={6}>
                <StatsApp
                  workouts={workouts}
                  records={records}
                  updateWorkouts={updateWorkouts}
                  selectWorkout={selectWorkout}
                  editingWorkout={editingWorkout}
                />
              </Grid>
            )}
          </Grid>
        )}
      </div>
    </ThemeProvider>
  );
};

export default WorkoutApp;
