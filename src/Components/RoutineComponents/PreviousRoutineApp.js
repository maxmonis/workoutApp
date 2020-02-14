import React from 'react';
import organizeRoutine from './organizeRoutine';

const PreviousRoutineApp = ({ previousRoutines }) => {
  if (previousRoutines.length > 0) {
    return (
      <div>
        <h2>Previous Workouts</h2>
        {previousRoutines.map(previousRoutine => (
          <div key={previousRoutine.id}>
            <h4>{previousRoutine.date}</h4>
            {organizeRoutine(previousRoutine.routine).map(exercise => (
              <h3 key={exercise.id}>{`${exercise.lift}${exercise.volume}`}</h3>
            ))}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default PreviousRoutineApp;
