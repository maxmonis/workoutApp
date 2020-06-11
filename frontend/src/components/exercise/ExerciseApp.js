import React from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import ExerciseList from './ExerciseList';

const ExerciseApp = ({
  exercises,
  reorderExercises,
  removeExercise,
  editExercise,
  lifts,
}) => {
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.index === source.index) {
      return;
    }
    const exerciseIds = exercises.map((exercise) => exercise.id);
    exerciseIds.splice(source.index, 1);
    exerciseIds.splice(destination.index, 0, draggableId);
    reorderExercises(exerciseIds);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ExerciseList
        exercises={exercises}
        removeExercise={removeExercise}
        editExercise={editExercise}
        lifts={lifts}
      />
    </DragDropContext>
  );
};

export default ExerciseApp;
