import React, { useState } from 'react';
import organizeWorkout from '../../Functions/organizeWorkout';
import ExerciseApp from '../ExerciseComponents/ExerciseApp';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

export default function CurrentWorkoutApp({
  currentWorkout,
  reorderWorkout,
  removeExercise,
  editExercise,
  lifts,
  currentWorkoutName,
  handleChange,
  handleSaveWorkout
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
    handleSaveWorkout();
    handleCloseDialog();
  };

  if (currentWorkout.length) {
    const exercises = organizeWorkout(currentWorkout);
    return (
      <div>
        <div>
          <ExerciseApp
            currentWorkout={currentWorkout}
            reorderWorkout={reorderWorkout}
            removeExercise={removeExercise}
            editExercise={editExercise}
            lifts={lifts}
          />
          <Button variant='outlined' color='primary' onClick={handleOpenDialog}>
            Save Workout
          </Button>
          <Dialog
            open={dialogOpen}
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
        </div>
      </div>
    );
  }
  return null;
}
