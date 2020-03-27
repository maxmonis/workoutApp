import React, { useState, Fragment } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import EditExerciseForm from './EditExerciseForm';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';

const Exercise = ({ exercise, removeExercise, editExercise, lifts, index }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const deleteExercise = () => {
    removeExercise(exercise.id);
  };
  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div style={{ fontSize: '20px' }}>
      <Draggable draggableId={exercise.id} index={index}>
        {provided => (
          <ListItem
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            component='div'
          >
            <Fragment>
              <ListItemText onClick={openDialog}>
                {exercise.lift}: {exercise.printout}
              </ListItemText>
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
            </Fragment>
          </ListItem>
        )}
      </Draggable>
    </div>
  );
};

export default Exercise;
