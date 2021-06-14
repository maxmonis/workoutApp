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
    <div>
      <h1>New Workout</h1>
      <div>
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
        />
      </div>
    </div>
  );
};

export default NewWorkout;
