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

const Exercise = ({
  currentExercise,
  removeExercise,
  editExercise,
  lifts,
  index
}) => {
  const currentId = currentExercise.id;
  const currentLift = currentExercise.lift;
  const currentSets = currentExercise.sets;
  const currentReps = currentExercise.reps;
  const currentWeight = currentExercise.weight;
  const currentPrintout = currentExercise.printout;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleRemoveExercise = () => {
    removeExercise(currentId);
  };
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div>
      <Draggable draggableId={currentId} index={index}>
        {provided => (
          <ListItem
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            component='div'
          >
            <Fragment>
              <ListItemText>
                {currentLift}: {currentPrintout}
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
                  width={'500px'}
                >
                  <DialogContent>
                    <EditExerciseForm
                      currentId={currentId}
                      currentLift={currentLift}
                      currentSets={currentSets}
                      currentReps={currentReps}
                      currentWeight={currentWeight}
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
