import React from 'react';

import { Draggable } from 'react-beautiful-dnd';

const Exercise = ({ exercise, index, selectExercise }) => {
  const handleClick = () => {
    selectExercise(exercise.id);
  };
  return (
    <div>
      <Draggable draggableId={exercise.id} index={index}>
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleClick}
          >
            {exercise.lift}: {exercise.printout}
          </li>
        )}
      </Draggable>
    </div>
  );
};

export default Exercise;
