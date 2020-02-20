import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const EditExerciseForm = ({
  editExercise,
  id,
  lift,
  sets,
  reps,
  weight,
  handleCloseDialog,
  lifts,
  index
}) => {
  const [currentLift, setCurrentLift] = useState(lift);
  const [currentSets, setCurrentSets] = useState(sets);
  const [currentReps, setCurrentReps] = useState(reps);
  const [currentWeight, setCurrentWeight] = useState(weight);

  const handleChange = e => {
    const { id, value } = e.target;
    switch (id) {
      case 'liftName':
        setCurrentLift(value);
        break;
      case 'numSets':
        setCurrentSets(value && parseInt(value));
        break;
      case 'numReps':
        setCurrentReps(value && parseInt(value));
        break;
      case 'currentWeight':
        setCurrentWeight(value && parseInt(value));
        break;
      default:
        return;
    }
  };

  const handleSaveChanges = () => {
    editExercise(id, currentLift, currentSets, currentReps, currentWeight, index);
    handleCloseDialog();
  };
  return (
    <form>
      <FormControl>
        <InputLabel id='currentLift'>Lift</InputLabel>
        <Select
          native
          labelId='currentLift'
          id='liftName'
          value={currentLift}
          onChange={handleChange}
          input={<Input id='currentLift' />}
        >
          {lifts.map(lift => (
            <option key={lift.id} value={lift.liftName}>
              {lift.liftName}
            </option>
          ))}
        </Select>

        <TextField
          id='numSets'
          label='Sets'
          type='number'
          value={currentSets}
          onChange={handleChange}
        />
        <TextField
          id='numReps'
          label='Reps'
          type='number'
          value={currentReps}
          onChange={handleChange}
        />
        <TextField
          required
          id='currentWeight'
          label='Weight'
          type='number'
          value={currentWeight}
          onChange={handleChange}
        />
        <Button color='primary' onClick={handleCloseDialog}>
          Discard Changes
        </Button>
        <Button color='primary' onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </FormControl>
    </form>
  );
};

export default EditExerciseForm;
