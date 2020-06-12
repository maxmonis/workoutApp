import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import Exercise from './Exercise';

const ExerciseList = ({ routine, selectExercise }) => {
  return (
    <div>
      <Droppable droppableId='ExerciseList'>
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {routine.map((exercise, index) => (
              <Exercise
                key={exercise.id}
                exercise={exercise}
                index={index}
                selectExercise={selectExercise}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default ExerciseList;
