import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Exercise from './Exercise';

const ExerciseList = ({ exercises, removeExercise, editExercise, lifts }) => {
  if (exercises.length)
    return (
      <Paper>
        <List>
          {exercises.map((exercise, i) => (
            <Fragment key={exercise.id}>
              <Exercise
                {...exercise}
                key={exercise.id}
                removeExercise={removeExercise}
                editExercise={editExercise}
                lifts={lifts}
              />
              {i < exercises.length - 1 && <Divider />}
            </Fragment>
          ))}
        </List>
      </Paper>
    );
  return null;
};

export default ExerciseList;
