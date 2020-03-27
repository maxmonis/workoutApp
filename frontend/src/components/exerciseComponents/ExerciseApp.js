import React from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import ExerciseList from './ExerciseList';

import Grid from '@material-ui/core/Grid';

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
    </DragDropContext>
  );
};

export default ExerciseApp;
