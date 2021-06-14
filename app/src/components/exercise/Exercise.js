import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Exercise = ({ exercise, index, selectExercise }) => {
  const { id, lift, printout } = exercise;
  const handleClick = () => {
    selectExercise(exercise);
  };
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleClick}>
          <h3>
            {lift}: {printout}
          </h3>
        </li>
      )}
    </Draggable>
  );
};

export default Exercise;
