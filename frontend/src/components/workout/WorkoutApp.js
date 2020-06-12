import React, { useState, useEffect, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import NewWorkout from './NewWorkout';
import ExerciseApp from '../exercise/ExerciseApp';
import LiftApp from '../lift/LiftApp';
import ClientContext from '../../context/client/clientContext';
import useClientState from '../../hooks/useClientState';
import useToggle from '../../hooks/useToggle';
import eliminateRedundancy from '../../functions/eliminateRedundancy';
import updateRoutine from '../../functions/updateRoutine';

const WorkoutApp = ({ selectedClient }) => {
  const clientContext = useContext(ClientContext);
  const { updateClient } = clientContext;
  const { client, updateLifts, updateWorkouts } = useClientState(
    selectedClient
  );
  const { lifts, _id } = client;
  const defaultExercise = {
    lift: lifts[0],
    sets: '',
    reps: '',
    weight: '',
  };
  const [exercise, setExercise] = useState(defaultExercise);
  const [routine, setRoutine] = useState([]);
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
      value !== '<<< Exercises >>>'
        ? setExercise({ ...exercise, [id]: value })
        : toggle();
    }
  };
  const addExercise = () => {
    setRoutine(eliminateRedundancy(updateRoutine(exercise, routine)));
  };
  const selectExercise = (id) => {
    setExercise(routine.find((exercise) => exercise.id === id));
    setRoutine(eliminateRedundancy(updateRoutine(id, routine)));
  };
  const saveWorkout = () => {
    updateWorkouts({ ...workout, routine });
    setWorkout(defaultWorkout);
    setRoutine([]);
  };
  useEffect(() => {
    const res = window.localStorage.getItem(`_id`);
    res && setRoutine(JSON.parse(res));
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    updateClient(client);
    // eslint-disable-next-line
  }, [client]);
  useEffect(() => {
    if (routine.length) {
      window.localStorage.setItem(`${_id}`, JSON.stringify(routine));
    } else {
      window.localStorage.removeItem(`${_id}`);
    }
    // eslint-disable-next-line
  }, [routine.length]);
  useEffect(() => {
    if (routine.length) {
      setRoutine(JSON.parse(window.localStorage.getItem(`${_id}`)));
    }
    // eslint-disable-next-line
  }, [lifts]);
  return (
    <div>
      <Typography variant='h3'>{client.name}</Typography>
      {isFormOpen ? (
        <LiftApp lifts={lifts} updateLifts={updateLifts} toggle={toggle} />
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
