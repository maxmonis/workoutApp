import React from 'react';
import AddExercise from '../exercise/AddExercise';
import ExerciseApp from '../exercise/ExerciseApp';
import SaveWorkout from './SaveWorkout';

const NewWorkout = ({
  exercise,
  workout,
  lifts,
  routine,
  records,
  handleChange,
  saveWorkout,
  updateRoutine,
  selectExercise,
  setExercise,
}) => {
  return (
    <>
      <h2>New Workout</h2>
      <AddExercise
        lifts={lifts}
        handleChange={handleChange}
        exercise={exercise}
        records={records}
        updateRoutine={updateRoutine}
        setExercise={setExercise}
      />
      <ExerciseApp
        routine={routine}
        updateRoutine={updateRoutine}
        selectExercise={selectExercise}
      />
      <SaveWorkout
        {...workout}
        routine={routine}
        handleChange={handleChange}
        saveWorkout={saveWorkout}
        updateRoutine={updateRoutine}
      />
    </>
  );
};

export default NewWorkout;
