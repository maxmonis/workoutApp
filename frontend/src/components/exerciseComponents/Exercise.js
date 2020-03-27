import React, { useState, Fragment } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DeleteIcon from '@material-ui/icons/Delete';
import EditExerciseForm from './EditExerciseForm';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItem';

const Exercise = ({ exercise, removeExercise, editExercise, lifts, index }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleRemoveExercise = () => {
    removeExercise(exercise.id);
  };
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
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
              <ListItemText>
                {exercise.lift}: {exercise.printout}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton onClick={handleRemoveExercise}>
                  <DeleteIcon aria-label='Delete' />
                </IconButton>
                <IconButton onClick={handleOpenDialog}>
                  <EditIcon aria-label='Edit' />
                </IconButton>
                <Dialog
                  disableBackdropClick
                  disableEscapeKeyDown
                  open={isDialogOpen}
                  onClose={handleCloseDialog}
                >
                  <DialogContent>
                    <EditExerciseForm
                      exerciseId={exercise.id}
                      initialLift={exercise.lift}
                      initialSets={exercise.sets}
                      initialReps={exercise.reps}
                      initialWeight={exercise.weight}
                      editExercise={editExercise}
                      handleCloseDialog={handleCloseDialog}
                      lifts={lifts}
                    />
                  </DialogContent>
                </Dialog>
              </ListItemSecondaryAction>
            </Fragment>
          </ListItem>
        )}
      </Draggable>
    </div>
  );
};

export default Exercise;
