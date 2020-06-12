import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Exercise = ({ exercise, index, selectExercise }) => {
  const { id, lift, printout } = exercise;
  const handleClick = () => {
    selectExercise(id);
  };
  return (
    <div>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleClick}
          >
            {lift}: {printout}
          </li>
        )}
      </Draggable>
    </div>
  );
};

export default Exercise;
