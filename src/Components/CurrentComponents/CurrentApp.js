import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const CurrentApp = ({ lifts }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentLift, setCurrentLift] = useState(lifts[0].liftName);
  const [currentSets, setCurrentSets] = useState(1);
  const [currentReps, setCurrentReps] = useState(1);
  const [currentWeight, setCurrentWeight] = useState(135);

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'liftName':
        setCurrentLift(value);
        break;
      case 'numSets':
        setCurrentSets(value);
        break;
      case 'numReps':
        setCurrentReps(value);
        break;
      case 'numWeight':
        setCurrentWeight(value);
        break;
      default:
        return;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log(currentLift, currentSets, currentReps, currentWeight);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Enter New Personal Record</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Enter New Personal Record</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor='currentLift'>Lift</InputLabel>
              <Select
                native
                id='liftName'
                name='liftName'
                value={currentLift}
                onChange={handleChange}
                input={<Input id='currentLift' />}
              >
                {lifts.map(lift => (
                  <option required key={lift.id} value={lift.liftName}>
                    {lift.liftName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id='numSets'
                name='numSets'
                label='Sets'
                type='number'
                value={currentSets}
                onChange={handleChange}
              />
              <TextField
                id='numReps'
                name='numReps'
                label='Reps'
                type='number'
                value={currentReps}
                onChange={handleChange}
              />
              <TextField
                required
                id='numWeight'
                name='numWeight'
                label='Weight'
                type='number'
                value={currentWeight}
                onChange={handleChange}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CurrentApp;
