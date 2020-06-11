import React, { useState, useEffect, useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

import ExerciseApp from '../exercise/ExerciseApp';
import LiftApp from '../lift/LiftApp';
import WorkoutApp from '../workout/WorkoutApp';

import eliminateRedundancy from '../../functions/eliminateRedundancy';
import updateRoutine from '../../functions/updateRoutine';

import useClientState from '../../hooks/useClientState';
import useToggle from '../../hooks/useToggle';

import Typography from '@material-ui/core/Typography';

const Controller = ({ selectedClient }) => {
  const clientContext = useContext(ClientContext);
  const { updateClient } = clientContext;
  const { client, updateLifts, updateWorkouts } = useClientState(
    selectedClient
  );
  const { lifts, _id } = client;
  const getRoutine = () => window.localStorage.getItem(`${_id}`) || [];
  const [routine, setRoutine] = useState(getRoutine());
  const defaultWorkout = {
    name: '',
    date: new Date().toISOString().slice(0, 10),
  };
  const [workout, setWorkout] = useState(defaultWorkout);
  const defaultExercise = {
    lift: lifts[0],
    sets: '',
    reps: '',
    weight: '',
  };
  const [exercise, setExercise] = useState(defaultExercise);
  const [isFormOpen, toggle] = useToggle(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'name' || id === 'date') {
      setWorkout({ ...workout, [id]: value });
    } else {
      value !== '<<< Edit Lifts >>>'
        ? setExercise({ ...exercise, [id]: value })
        : toggle();
    }
  };
  const addExercise = () => {
    setRoutine(eliminateRedundancy(updateRoutine(exercise)));
  };
  const saveWorkout = () => {
    updateWorkouts({ ...workout, routine });
    setWorkout(defaultWorkout);
  };
  useEffect(() => {
    updateClient(client);
    // eslint-disable-next-line
  }, [client]);
  useEffect(() => {
    window.localStorage.setItem(`${_id}`, routine);
    // eslint-disable-next-line
  }, [routine]);
  useEffect(() => {
    setRoutine(getRoutine());
    // eslint-disable-next-line
  }, [lifts]);
  return (
    <div>
      <Typography variant='h3'>{client.name}</Typography>
      {isFormOpen ? (
        <LiftApp lifts={lifts} updateLifts={updateLifts} toggle={toggle} />
      ) : (
        <div>
          <WorkoutApp
            exercise={exercise}
            workout={workout}
            lifts={lifts}
            handleChange={handleChange}
            addExercise={addExercise}
            saveWorkout={saveWorkout}
          />
          <ExerciseApp
            lifts={lifts}
            exercises={routine}
            updateRoutine={updateRoutine}
          />
        </div>
      )}
    </div>
  );
};

export default Controller;
