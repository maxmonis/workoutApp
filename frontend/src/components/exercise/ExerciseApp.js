import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ExerciseList from './ExerciseList';

const ExerciseApp = ({ lifts, routine, updateRoutine, selectExercise }) => {
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (destination && destination.index !== source.index) {
      const exerciseIds = routine.map((exercise) => exercise.id);
      exerciseIds.splice(source.index, 1);
      exerciseIds.splice(destination.index, 0, draggableId);
      updateRoutine(exerciseIds);
    }
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ExerciseList
        routine={routine}
        selectExercise={selectExercise}
      />
    </DragDropContext>
  );
};

export default ExerciseApp;
