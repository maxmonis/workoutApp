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
  reorderCurrentWorkout,
  resetCurrentWorkout,
  removeExercise,
  editExercise,
  lifts,
  workoutName,
  handleSaveWorkout,
  workoutDate,
  updateWorkoutDate,
  updateWorkoutName
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
        <Button onClick={handleResetWorkout} style={{ float: 'right' }}>
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
            <Button onClick={handleCloseDialog} color='primary'>
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
