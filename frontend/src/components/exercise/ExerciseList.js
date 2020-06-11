import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import Exercise from './Exercise';

const ExerciseList = ({
  exercises,
  removeExercise,
  editExercise,
  lifts,
}) => {
  if (exercises.length)
    return (
      <div>
        <Droppable droppableId='ExerciseList'>
          {(provided) => (
            <ul
              style={{ listStyle: 'none', padding: 0 }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {exercises.map((exercise, index) => (
                <Exercise
                  key={exercise.id}
                  exercise={exercise}
                  removeExercise={removeExercise}
                  editExercise={editExercise}
                  lifts={lifts}
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
