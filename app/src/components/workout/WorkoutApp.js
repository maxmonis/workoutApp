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
      value === '#' ? toggle() : setExercise({ ...exercise, [id]: value });
    }
  };
  const selectExercise = (exercise) => {
    setExercise(exercise);
    updateRoutine(exercise.id);
  };
  const saveWorkout = () => {
    updateWorkouts({ ...workout, routine });
    setExercise(defaultExercise);
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
            <div className={workouts.length ? 'left' : ''}>
              <NewWorkout
                exercise={exercise}
                workout={workout}
                lifts={lifts}
                routine={routine}
                handleChange={handleChange}
                saveWorkout={saveWorkout}
                updateRoutine={updateRoutine}
                selectExercise={selectExercise}
                workouts={workouts}
                lift={exercise.lift}
                setExercise={setExercise}
              />
            </div>
            {workouts.length > 0 && (
              <div className={workouts.length ? 'right' : ''}>
                <StatsApp
                  workouts={workouts}
                  records={records}
                  updateWorkouts={updateWorkouts}
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
