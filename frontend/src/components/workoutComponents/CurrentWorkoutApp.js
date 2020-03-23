import React, { useState } from 'react';

import ExerciseApp from '../exerciseComponents/ExerciseApp';

import organizeExercises from '../../functions/organizeExercises';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

const CurrentWorkoutApp = ({
  currentWorkout,
  reorderCurrentWorkout,
  resetCurrentWorkout,
  removeExercise,
  editExercise,
  lifts,
  currentWorkoutName,
  handleChange,
  handleSaveWorkout
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSave = () => {
    handleSaveWorkout();
    handleCloseDialog();
  };

  const handleResetWorkout = () => {
    resetCurrentWorkout();
  };

  if (currentWorkout.length) {
    const exercises = organizeExercises(currentWorkout);
    return (
      <div>
        <Button variant='outlined' color='primary' onClick={handleOpenDialog}>
          Save Workout
        </Button>
        <Button onClick={handleResetWorkout}>
          Reset Workout
        </Button>
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby='form-dialog-title'
        >
          <DialogContent>
            <TextField
              required
              id='workoutName'
              label='Workout Name'
              type='string'
              variant='outlined'
              value={currentWorkoutName}
              onChange={handleChange}
              autoFocus
            />
            {exercises.map(exercise => (
              <h4
                key={exercise.id}
              >{`${exercise.lift}: ${exercise.printout}`}</h4>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color='primary'>
              Cancel
            </Button>
            {currentWorkoutName ? (
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
          reorderCurrentWorkout={reorderCurrentWorkout}
          removeExercise={removeExercise}
          editExercise={editExercise}
          lifts={lifts}
        />
      </div>
    );
  }
  return null;
};

export default CurrentWorkoutApp;
