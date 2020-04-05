import React, { useState } from 'react';

import DatePicker from './DatePicker';
import ExerciseApp from '../exerciseComponents/ExerciseApp';

import organizeExercises from '../../functions/organizeExercises';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

const CurrentWorkoutApp = ({
  currentWorkout,
  reorderWorkout,
  resetWorkout,
  removeExercise,
  editExercise,
  lifts,
  workoutName,
  workoutDate,
  saveWorkout,
  updateWorkoutDate,
  updateWorkoutName
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSave = () => {
    saveWorkout();
    closeDialog();
  };
  const handleReset = () => {
    resetWorkout();
  };

  if (currentWorkout.length) {
    const exercises = organizeExercises(currentWorkout);
    return (
      <div>
        <Dialog
          open={isDialogOpen}
          onClose={closeDialog}
          aria-labelledby='form-dialog-title'
        >
          <DialogContent>
            <TextField
              required
              id='workoutName'
              label='Workout Name'
              type='string'
              variant='outlined'
              value={workoutName}
              onChange={updateWorkoutName}
              autoFocus
            />
            <DatePicker
              workoutDate={workoutDate}
              updateWorkoutDate={updateWorkoutDate}
            />
            {exercises.map(exercise => (
              <h4
                key={exercise.id}
              >{`${exercise.lift}: ${exercise.printout}`}</h4>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color='primary'>
              Cancel
            </Button>
            {workoutName ? (
              <Button onClick={handleSave} color='primary'>
                Save
              </Button>
            ) : (
              <Button disabled color='primary'>
                Name is Required
              </Button>
            )}
          </DialogActions>
        </Dialog>
        <ExerciseApp
          currentWorkout={currentWorkout}
          reorderWorkout={reorderWorkout}
          removeExercise={removeExercise}
          editExercise={editExercise}
          lifts={lifts}
        />
        <div>
          <Button onClick={handleReset}>Reset</Button>
          <Button color='primary' onClick={openDialog}>
            Save
          </Button>
        </div>
      </div>
    );
  }
  return null;
};

export default CurrentWorkoutApp;
