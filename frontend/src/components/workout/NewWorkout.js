import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddExercise from '../exercise/AddExercise';
import ExerciseApp from '../exercise/ExerciseApp';
import Exercises from '../stats/Exercises';
import SaveWorkout from './SaveWorkout';
import useToggle from '../../hooks/useToggle';
import organizeRoutine from '../../functions/organizeRoutine';

const NewWorkout = ({
  exercise,
  workout,
  lifts,
  routine,
  handleChange,
  addExercise,
  saveWorkout,
  updateRoutine,
  selectExercise,
  workouts,
  lift,
  autopopulate,
}) => {
  const [isFormOpen, toggle] = useToggle(false);
  const handleSave = () => {
    saveWorkout();
    toggle();
  };
  return isFormOpen ? (
    <div>
      <SaveWorkout
        {...workout}
        handleChange={handleChange}
        handleSave={handleSave}
        toggle={toggle}
      />
      {organizeRoutine(routine).map((exercise) => (
        <h4 key={exercise.id}>
          {exercise.lift}: {exercise.printout}
        </h4>
      ))}
    </div>
  ) : (
    <div>
      <Exercises workouts={workouts} lift={lift} autopopulate={autopopulate} />
      <Paper className='container'>
        <AddExercise
          lifts={lifts}
          handleChange={handleChange}
          exercise={exercise}
          addExercise={addExercise}
        />
      </Paper>
      {routine.length > 0 && (
        <div>
          <ExerciseApp
            routine={routine}
            updateRoutine={updateRoutine}
            selectExercise={selectExercise}
          />
          <Button variant='outlined' color='inherit' onClick={toggle}>
            Save Workout
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewWorkout;
