import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Exercise from './Exercise';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const ExerciseList = ({
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
    const exerciseIds = currentWorkout.map(exercise => exercise.id);
    exerciseIds.splice(source.index, 1);
    exerciseIds.splice(destination.index, 0, draggableId);
    reorderCurrentWorkout(exerciseIds);
  };
  if (currentWorkout.length) {
    return (
      <Paper>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={'ExerciseList'}>
            {provided => (
              <List innerRef={provided.innerRef} {...provided.droppableProps}>
                {currentWorkout.map((exercise, i) => (
                  <Fragment key={exercise.id}>
                    <Exercise
                      {...exercise}
                      removeExercise={removeExercise}
                      editExercise={editExercise}
                      lifts={lifts}
                      index={i}
                    />
                    {i < currentWorkout.length - 1 && <Divider />}
                  </Fragment>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Paper>
    );
  }
  return null;
};

export default ExerciseList;
