import React, { useState } from 'react';

import alphabetize from '../../functions/alphabetize';
import organizeExercises from '../../functions/organizeExercises';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const PreviousWorkoutApp = ({ previousWorkouts }) => {
  const [currentWorkoutName, setCurrentWorkoutName] = useState('All');
  const [isDisplayingWorkouts, setIsDisplayingWorkouts] = useState(false);

  const uniqueWorkoutNames = ['All'];
  const sortedWorkoutNames = alphabetize(
    previousWorkouts.map(previousWorkout => previousWorkout.name)
  );
  for (const workoutName of sortedWorkoutNames) {
    !uniqueWorkoutNames.includes(workoutName) &&
      uniqueWorkoutNames.push(workoutName);
  }

  const selectedWorkouts =
    currentWorkoutName !== 'All'
      ? previousWorkouts.filter(
          previousWorkout => previousWorkout.name === currentWorkoutName
        )
      : previousWorkouts;

  const showWorkouts = () => {
    setIsDisplayingWorkouts(true);
  };
  const hideWorkouts = () => {
    setCurrentWorkoutName('All');
    setIsDisplayingWorkouts(false);
  };
  const handleToggle = () => {
    isDisplayingWorkouts ? hideWorkouts() : showWorkouts();
  };
  const handleChange = e => {
    setCurrentWorkoutName(e.target.value);
    !isDisplayingWorkouts && showWorkouts();
  };

  return (
    <div style={{ width: '450px', marginTop: '20px' }}>
      <Paper style={{ padding: '20px' }}>
        <Button onClick={handleToggle}>
          {isDisplayingWorkouts ? 'Hide ' : 'Show '}Previous Workouts
        </Button>
        <Select
          style={{ marginLeft: '5px', width: '150px' }}
          native
          labelId='workoutName'
          value={currentWorkoutName}
          onChange={handleChange}
          input={<Input id='workoutName' />}
        >
          {uniqueWorkoutNames.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
        {isDisplayingWorkouts && (
          <div style={{ marginTop: '20px' }}>
            {selectedWorkouts.map(selectedWorkout => (
              <div key={selectedWorkout.id} style={{ marginBottom: '20px' }}>
                <Typography variant='h5'>
                  {currentWorkoutName === 'All' && `${selectedWorkout.name} - `}
                  {selectedWorkout.date}
                </Typography>
                {organizeExercises(selectedWorkout.workout).map(exercise => (
                  <Typography
                    variant='h6'
                    key={exercise.id}
                  >{`${exercise.lift}: ${exercise.printout}`}</Typography>
                ))}
              </div>
            ))}
            <Button onClick={hideWorkouts}>Hide Workouts</Button>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default PreviousWorkoutApp;
