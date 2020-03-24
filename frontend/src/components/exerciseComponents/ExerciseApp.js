import React from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import ExerciseList from './ExerciseList';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const ExerciseApp = ({
  currentWorkout,
  reorderCurrentWorkout,
  removeExercise,
  editExercise,
  lifts
}) => {
  const handleDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.index === source.index) {
      return;
    }
    const newOrder = currentWorkout.map(exercise => exercise.id);
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, draggableId);
    reorderCurrentWorkout(newOrder);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Paper
        style={{
          padding: 0,
          heights: '100vh',
          backgroundColor: '#fafafa'
        }}
        elevation={0}
      >
        <Grid container justify='center'>
          <Grid item xs>
            <ExerciseList
              currentWorkout={currentWorkout}
              removeExercise={removeExercise}
              editExercise={editExercise}
              lifts={lifts}
            />
          </Grid>
        </Grid>
      </Paper>
    </DragDropContext>
  );
};

export default ExerciseApp;
