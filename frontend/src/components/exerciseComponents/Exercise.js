import React, { useState } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import EditExerciseForm from './EditExerciseForm';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const Exercise = ({ exercise, removeExercise, editExercise, lifts, index }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  const deleteExercise = () => {
    removeExercise(exercise.id);
  };
  return (
    <div>
      <Draggable draggableId={exercise.id} index={index}>
        {provided => (
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
            exerciseId={exercise.id}
            initialLift={exercise.lift}
            initialSets={exercise.sets}
            initialReps={exercise.reps}
            initialWeight={exercise.weight}
            editExercise={editExercise}
            deleteExercise={deleteExercise}
            closeDialog={closeDialog}
            lifts={lifts}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Exercise;
