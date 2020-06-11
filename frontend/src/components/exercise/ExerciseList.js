import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import Exercise from './Exercise';

const ExerciseList = ({ lifts, routine, updateRoutine }) => {
  if (routine.length)
    return (
      <div>
        <Droppable droppableId='ExerciseList'>
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {routine.map((exercise, index) => (
                <Exercise
                  key={exercise.id}
                  lifts={lifts}
                  exercise={exercise}
                  updateRoutine={updateRoutine}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    );
  return null;
};

export default ExerciseList;
