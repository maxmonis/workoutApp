import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExerciseList from './ExerciseList';

const ExerciseApp = ({
  currentWorkout,
  reorderCurrentWorkout,
  removeExercise,
  editExercise,
  lifts
}) => {
  return (
    <Paper
      style={{
        width: '400px',
        padding: 0,
        marginRight: 'auto',
        marginLeft: 'auto',
        heights: '100vh',
        backgroundColor: '#fafafa'
      }}
      elevation={0}
    >
      <Grid container justify='center'>
        <Grid item xs>
          <ExerciseList
            currentWorkout={currentWorkout}

            reorderCurrentWorkout={reorderCurrentWorkout}
            removeExercise={removeExercise}
            editExercise={editExercise}
            lifts={lifts}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ExerciseApp;
