import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExerciseList from './ExerciseList';

const ExerciseApp = ({
  exercises,
  removeExercise,
  editExercise,
  lifts
}) => {
  return (
    <Paper
      style={{
        width: '400px',
        padding: 0,
        margin: 0,
        heights: '100vh',
        backgroundColor: '#fafafa'
      }}
      elevation={0}
    >
      <Grid container justify='center'>
        <Grid item xs>
          <ExerciseList
            exercises={exercises}
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
