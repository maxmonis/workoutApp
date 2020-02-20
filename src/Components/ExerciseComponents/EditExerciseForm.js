import React, { useState } from 'react';

import ExerciseEntryForm from './ExerciseEntryForm';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const EditExerciseForm = ({
  editExercise,
  id,
  lift,
  sets,
  reps,
  weight,
  handleCloseDialog,
  lifts
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
    editExercise(id, currentLift, currentSets, currentReps, currentWeight);
    handleCloseDialog();
  };
  return (
    <form>
      <FormControl>
        <ExerciseEntryForm
          lifts={lifts}
          handleChange={handleChange}
          currentLift={currentLift}
          currentSets={currentSets}
          currentReps={currentReps}
          currentWeight={currentWeight}
        />
        <div>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button color='primary' onClick={handleSaveChanges}>
            Save
          </Button>
        </div>
      </FormControl>
    </form>
  );
};

export default EditExerciseForm;
