import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import NewWorkout from './NewWorkout';
import StatsApp from '../stats/StatsApp';
import LiftApp from '../lift/LiftApp';
import useClientState from '../../hooks/useClientState';
import useToggle from '../../hooks/useToggle';

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
  const [isFormOpen, toggle] = useToggle(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'name' || id === 'date') {
      setWorkout({ ...workout, [id]: value });
    } else {
      value === 'Edit' ? toggle() : setExercise({ ...exercise, [id]: value });
    }
  };
  const addExercise = () => {
    updateRoutine(exercise);
  };
  const selectExercise = (exercise) => {
    setExercise(exercise);
    updateRoutine(exercise.id);
  };
  const autopopulate = (exercise) => setExercise(exercise);
  const saveWorkout = () => {
    updateWorkouts({ ...workout, routine });
    setWorkout(defaultWorkout);
    updateRoutine([]);
  };
  useEffect(() => {
    updateClient(client);
    // eslint-disable-next-line
  }, [client]);
  return (
    <div>
      <Typography variant='h3'>{client.name}</Typography>
      <div>
        {isFormOpen ? (
          <LiftApp lifts={lifts} updateLifts={updateLifts} toggle={toggle} />
        ) : (
          <div className={workouts.length ? 'container' : ''}>
            <div className={workouts.length ? 'item left' : ''}>
              <NewWorkout
                exercise={exercise}
                workout={workout}
                lifts={lifts}
                routine={routine}
                handleChange={handleChange}
                addExercise={addExercise}
                saveWorkout={saveWorkout}
                updateRoutine={updateRoutine}
                selectExercise={selectExercise}
                workouts={workouts}
                lift={exercise.lift}
                autopopulate={autopopulate}
              />
            </div>
            {workouts.length > 0 && (
              <div className={workouts.length ? 'item right' : ''}>
                <StatsApp
                  workouts={workouts}
                  records={records}
                  lift={exercise.lift}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutApp;
