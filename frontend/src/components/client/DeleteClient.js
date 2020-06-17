import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const DeleteClient = ({ fullName, toggle, handleDelete }) => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const [isMatch, setIsMatch] = useState(false);
  useEffect(() => {
    standardize(inputValue).includes(standardize(fullName))
      ? setIsMatch(true)
      : setIsMatch(false);
    // eslint-disable-next-line
  }, [inputValue]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMatch) handleDelete();
  };
  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>{`Permanently delete ${fullName}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          All associated data will be lost forever and this action cannot be
          undone. Confirm the name of the client you wish to delete in order to
          proceed.
        </DialogContentText>
        <TextField
          value={inputValue}
          variant='outlined'
          placeholder='Confirm Name...'
          onChange={handleChange}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle}>Cancel</Button>
        {isMatch ? (
          <Button type='submit' color='primary'>
            Delete
          </Button>
        ) : (
          <Button disabled>Delete</Button>
        )}
      </DialogActions>
    </form>
  );
};

function standardize(string) {
  return string.replace(/[^a-z]+/gi, '').toUpperCase();
}

export default DeleteClient;
