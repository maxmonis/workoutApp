import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExerciseList from './ExerciseList';
import { DragDropContext } from 'react-beautiful-dnd';

const ExerciseApp = ({
  currentWorkout,
  reorderWorkout,
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
    reorderWorkout(newOrder);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
