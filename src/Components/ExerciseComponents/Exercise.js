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
  id,
  lift,
  sets,
  reps,
  weight,
  printout,
  removeExercise,
  editExercise,
  lifts,
  index
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div>
      <Draggable draggableId={id} index={index}>
        {provided => (
          <ListItem
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            component='div'
          >
            <Fragment>
              <ListItemText>
                {lift}: {printout}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton onClick={() => removeExercise(id)}>
                  <DeleteIcon aria-label='Delete' />
                </IconButton>
                <IconButton onClick={handleOpenDialog}>
                  <EditIcon aria-label='Edit' />
                </IconButton>
                <Dialog
                  disableBackdropClick
                  disableEscapeKeyDown
                  open={openDialog}
                  onClose={handleCloseDialog}
                  width={'500px'}
                >
                  <DialogContent>
                    <EditExerciseForm
                      editExercise={editExercise}
                      id={id}
                      lift={lift}
                      sets={sets}
                      reps={reps}
                      weight={weight}
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
