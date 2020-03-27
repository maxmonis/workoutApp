import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import Divider from '@material-ui/core/Divider';
import Exercise from './Exercise';
import List from '@material-ui/core/List';

const ExerciseList = ({
  currentWorkout,
  removeExercise,
  editExercise,
  lifts
}) => {
  if (currentWorkout.length)
    return (
      <div>
        <Droppable droppableId='ExerciseList'>
          {provided => (
            <List innerRef={provided.innerRef} {...provided.droppableProps}>
              <Divider />
              {currentWorkout.map((exercise, index) => (
                <Exercise
                  key={exercise.id}
                  exercise={exercise}
                  removeExercise={removeExercise}
                  editExercise={editExercise}
                  lifts={lifts}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </div>
    );
  return null;
};

export default ExerciseList;
