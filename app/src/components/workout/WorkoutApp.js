import React, { useState, useEffect, useContext } from 'react';
import NewWorkout from './NewWorkout';
import StatsApp from '../stats/StatsApp';
import LiftApp from '../lift/LiftApp';
import AlertContext from '../../context/alert/alertContext';
import useClientState from '../../hooks/useClientState';
import useToggle from '../../hooks/useToggle';

const WorkoutApp = ({ selectedClient, updateClient }) => {
  const { setAlert } = useContext(AlertContext);
  const { client, routine, updateRoutine, updateLifts, updateWorkouts } =
    useClientState(selectedClient);
  const { lifts, workouts, records, name } = client;
  const DEFAULT_EXERCISE = {
    lift: lifts[0],
    sets: '',
    reps: '',
    weight: '',
  };
  const [exercise, setExercise] = useState(DEFAULT_EXERCISE);
  const DEFAULT_WORKOUT = {
    name: '',
    date: new Date().toISOString().slice(0, 10),
  };
  const [workout, setWorkout] = useState(DEFAULT_WORKOUT);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [isFormOpen, toggleLiftForm] = useToggle(false);
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'date') {
      editingWorkout
        ? setEditingWorkout({ ...editingWorkout, [name]: value })
        : setWorkout({ ...workout, [name]: value });
    } else {
      value === '#'
        ? toggleLiftForm()
        : setExercise({ ...exercise, [name]: value });
    }
  };
  const selectExercise = exercise => {
    setExercise(exercise);
    updateRoutine(exercise.id);
  };
  const selectWorkout = workout => {
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
    setAlert('Workout Saved', 'success');
    updateWorkouts(updated);
    setExercise(DEFAULT_EXERCISE);
    setWorkout(DEFAULT_WORKOUT);
    setEditingWorkout(null);
    updateRoutine([]);
  };
  const title = name[0] === '#' ? name.slice(2) : name;
  useEffect(() => {
    document.title = `maxWellness | ${title}`;
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    updateClient(client);
    // eslint-disable-next-line
  }, [client]);
  return (
    <div className='workout-app full-size'>
      <section>
        {isFormOpen ? (
          <LiftApp
            lifts={lifts}
            updateLifts={updateLifts}
            toggleLiftForm={toggleLiftForm}
          />
        ) : (
          <NewWorkout
            exercise={exercise}
            workout={editingWorkout ? editingWorkout : workout}
            lifts={lifts}
            routine={routine}
            workouts={workouts}
            records={records}
            handleChange={handleChange}
            saveWorkout={saveWorkout}
            updateRoutine={updateRoutine}
            selectExercise={selectExercise}
            setExercise={setExercise}
          />
        )}
      </section>
      <StatsApp
        records={records}
        workouts={workouts}
        updateWorkouts={updateWorkouts}
        selectWorkout={selectWorkout}
        editingWorkout={editingWorkout}
      />
    </div>
  );
};

export default WorkoutApp;
