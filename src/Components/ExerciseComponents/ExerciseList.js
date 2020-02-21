import React, { Fragment } from 'react';

import { Droppable } from 'react-beautiful-dnd';

import Divider from '@material-ui/core/Divider';
import Exercise from './Exercise';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

const ExerciseList = ({
  currentWorkout,
  removeExercise,
  editExercise,
  lifts
}) => {
  if (currentWorkout.length)
    return (
      <Paper>
        <Droppable droppableId='ExerciseList'>
          {provided => (
            <List innerRef={provided.innerRef} {...provided.droppableProps}>
              {currentWorkout.map((exercise, i) => (
                <Fragment key={exercise.id}>
                  <Exercise
                    key={exercise.id}
                    currentExercise={exercise}
                    removeExercise={removeExercise}
                    editExercise={editExercise}
                    lifts={lifts}
                    index={i}
                  />
                  {i < currentWorkout.length - 1 && <Divider />}
                </Fragment>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </Paper>
    );
  return null;
};

export default ExerciseList;
