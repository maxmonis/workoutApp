import React, { useState, Fragment } from 'react';
import EditExerciseForm from './EditExerciseForm';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Draggable } from 'react-beautiful-dnd';

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
    <Draggable draggableId={id} index={index}>
      {provided => (
        <ListItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
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
                    index={index}
                  />
                </DialogContent>
              </Dialog>
            </ListItemSecondaryAction>
          </Fragment>
        </ListItem>
      )}
    </Draggable>
  );
};

export default Exercise;
