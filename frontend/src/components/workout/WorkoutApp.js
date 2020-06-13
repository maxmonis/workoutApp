import React, { useState, useEffect, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import NewWorkout from './NewWorkout';
import ExerciseApp from '../exercise/ExerciseApp';
import LiftApp from '../lift/LiftApp';
import ClientContext from '../../context/client/clientContext';
import useClientState from '../../hooks/useClientState';
import useToggle from '../../hooks/useToggle';

const WorkoutApp = ({ selectedClient, defaultRoutine }) => {
  const clientContext = useContext(ClientContext);
  const { updateClient } = clientContext;
  const {
    client,
    routine,
    updateRoutine,
    updateLifts,
    updateWorkouts,
  } = useClientState(selectedClient, []);
  const { lifts } = client;
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
      value !== '<<< Edit Exercises >>>'
        ? setExercise({ ...exercise, [id]: value })
        : toggle();
    }
  };
  const addExercise = () => {
    updateRoutine(exercise);
  };
  const selectExercise = (id) => {
    setExercise(routine.find((exercise) => exercise.id === id));
    updateRoutine(id);
  };
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
      {isFormOpen ? (
        <div>
          <Typography variant='h4'>Edit Exercises</Typography>
          <LiftApp lifts={lifts} updateLifts={updateLifts} toggle={toggle} />
        </div>
      ) : (
        <div>
          <Typography variant='h4'>New Workout</Typography>
          <NewWorkout
            exercise={exercise}
            workout={workout}
            lifts={lifts}
            handleChange={handleChange}
            addExercise={addExercise}
            saveWorkout={saveWorkout}
          />
          {routine.length > 0 && (
            <ExerciseApp
              lifts={lifts}
              routine={routine}
              updateRoutine={updateRoutine}
              selectExercise={selectExercise}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WorkoutApp;
