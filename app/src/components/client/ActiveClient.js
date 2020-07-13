import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';

const ActiveClient = ({
  name,
  id,
  toggle,
  handleEdit,
  handleDeactivate,
}) => {
  const [optionsShown, setOptionsShown] = useState(false);
  const showOptions = () => setOptionsShown(true);
  const hideOptions = () => setOptionsShown(false);
  return (
    <div onMouseEnter={showOptions} onMouseLeave={hideOptions}>
      <ListItem>
        {optionsShown ? (
          <Link className='link' to={id} style={{ margin: '0 auto' }}>
            <Button color='primary' onClick={toggle}>
              {name}
            </Button>
          </Link>
        ) : (
          <Button color='default' onClick={toggle} style={{ margin: '0 auto' }}>
            {name}
          </Button>
        )}
      </ListItem>
      {optionsShown && (
        <div>
          <IconButton color='inherit' onClick={handleEdit}>
            <EditIcon aria-label='Edit' />
          </IconButton>
          <IconButton color='inherit' onClick={handleDeactivate}>
            <ClearIcon aria-label='Deactivate' />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ActiveClient;
