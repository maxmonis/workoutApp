import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import DeleteClient from './DeleteClient';
import useToggle from '../../hooks/useToggle';

const InactiveClient = ({ name, handleActivate, handleDelete }) => {
  const [isDialogOpen, toggle] = useToggle(false);
  const [optionsShown, setOptionsShown] = useState(false);
  const showOptions = () => setOptionsShown(true);
  const hideOptions = () => setOptionsShown(false);
  return (
    <div onMouseEnter={showOptions} onMouseLeave={hideOptions}>
      <ListItem>
        <Button disabled>
          {name}
        </Button>
      </ListItem>
      {optionsShown && (
        <div>
          <IconButton onClick={handleActivate}>
            <AddIcon aria-label='Recover' />
          </IconButton>
          <IconButton onClick={toggle}>
            <DeleteIcon aria-label='Delete' />
          </IconButton>
        </div>
      )}
      <Dialog
        open={isDialogOpen}
        onClose={toggle}
      >
        <DeleteClient name={name} toggle={toggle} handleDelete={handleDelete} />
      </Dialog>
    </div>
  );
};

export default InactiveClient;
