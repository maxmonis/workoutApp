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
  const defaultExercise = {
    lift: lifts[0],
    sets: '',
    reps: '',
    weight: '',
  };
  const [exercise, setExercise] = useState(defaultExercise);
  const getDefaultName = () => {
    const now = new Date();
    const day = now.getDay();
    const DAYS = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const weekday = DAYS[day];
    const hrs = now.getHours();
    const time = hrs < 12 ? 'morning' : hrs < 17 ? 'afternoon' : 'evening';
    return `${weekday} ${time} workout`;
  };
  const defaultWorkout = {
    name: getDefaultName(),
    date: new Date().toISOString().slice(0, 10),
  };
  const [workout, setWorkout] = useState(defaultWorkout);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [isFormOpen, toggle] = useToggle(false);
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'date') {
      editingWorkout
        ? setEditingWorkout({ ...editingWorkout, [name]: value })
        : setWorkout({ ...workout, [name]: value });
    } else {
      value === '#' ? toggle() : setExercise({ ...exercise, [name]: value });
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
    setExercise(defaultExercise);
    setWorkout(defaultWorkout);
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
    <div>
      <div className='workout-app'>
        <div>
          {isFormOpen ? (
            <LiftApp lifts={lifts} updateLifts={updateLifts} toggle={toggle} />
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
        </div>
        {workouts.length > 0 && (
          <div>
            <StatsApp
              workouts={workouts}
              records={records}
              updateWorkouts={updateWorkouts}
              selectWorkout={selectWorkout}
              editingWorkout={editingWorkout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutApp;
