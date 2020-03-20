import React, { useState, Fragment } from 'react';

import organizeWorkout from '../../functions/organizeWorkout';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const PreviousWorkoutApp = ({ previousWorkouts }) => {
  const [numDisplayedWorkouts, setNumDisplayedWorkouts] = useState(1);
  const [currentWorkoutName, setCurrentWorkoutName] = useState('All');
  const [isDisplayingWorkouts, setIsDisplayingWorkouts] = useState(false);

  const uniqueWorkoutNames = ['All'];
  const populateUniqueWorkoutNames = () => {
    previousWorkouts
      .map(workout => workout.name)
      .forEach(workoutName => {
        if (!uniqueWorkoutNames.includes(workoutName)) {
          uniqueWorkoutNames.push(workoutName);
        }
      });
  };
  populateUniqueWorkoutNames();

  const selectedWorkouts =
    currentWorkoutName !== 'All'
      ? previousWorkouts.filter(
          previousWorkout => previousWorkout.name === currentWorkoutName
        )
      : previousWorkouts;

  const displayAdditionalWorkouts = () => {
    const newNumDisplayedWorkouts = numDisplayedWorkouts + 1;
    setNumDisplayedWorkouts(newNumDisplayedWorkouts);
  };
  const displayFewerWorkouts = () => {
    const newNumDisplayedWorkouts = numDisplayedWorkouts - 1;
    setNumDisplayedWorkouts(newNumDisplayedWorkouts);
  };
  const handleDisplayWorkouts = () => {
    setIsDisplayingWorkouts(true);
  };
  const handleHideWorkouts = () => {
    setCurrentWorkoutName('All');
    setIsDisplayingWorkouts(false);
  };
  const handleChange = e => {
    setCurrentWorkoutName(e.target.value);
  };

  return (
    <div style={{ width: '450px', marginTop: '20px' }}>
      <Paper style={{ padding: '20px' }}>
        <Button onClick={handleDisplayWorkouts}>
          <Select
            style={{ marginLeft: '5px' }}
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
          </Select>{' '}
          Recent Workouts
        </Button>
        {isDisplayingWorkouts && (
          <div>
            {selectedWorkouts
              .slice(0, numDisplayedWorkouts)
              .map(selectedWorkout => (
                <div key={selectedWorkout.id}>
                  <Typography variant='h5'>
                    {selectedWorkout.name} - {selectedWorkout.date}
                  </Typography>
                  {organizeWorkout(selectedWorkout.workout).map(exercise => (
                    <Typography
                      variant='h6'
                      key={exercise.id}
                    >{`${exercise.lift}: ${exercise.printout}`}</Typography>
                  ))}
                </div>
              ))}
            {numDisplayedWorkouts > 1 && (
              <Button color='primary' onClick={displayFewerWorkouts}>
                Show fewer workouts
              </Button>
            )}
            {selectedWorkouts.length > numDisplayedWorkouts && (
              <Fragment>
                <Button color='primary' onClick={displayAdditionalWorkouts}>
                  Show additional workouts
                </Button>
              </Fragment>
            )}
            <Button onClick={handleHideWorkouts}>Hide Workouts</Button>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default PreviousWorkoutApp;
