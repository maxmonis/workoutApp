import React, { useState } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import EditExerciseForm from './EditExerciseForm';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const Exercise = ({ exercise, updateExercise, lifts, index }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div>
      <Draggable draggableId={exercise.id} index={index}>
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={openDialog}
          >
            {exercise.lift}: {exercise.printout}
          </li>
        )}
      </Draggable>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogContent>
          <EditExerciseForm
            exercise={exercise}
            updateExercise={updateExercise}
            closeDialog={closeDialog}
            lifts={lifts}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Exercise;
