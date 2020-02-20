import React from 'react';

import organizeWorkout from '../../Functions/organizeWorkout';

const PreviousWorkoutApp = ({ previousWorkouts }) => {
  if (previousWorkouts.length > 0) {
    return (
      <div>
        <h2>Previous Workouts</h2>
        {previousWorkouts.map(previousWorkout => (
          <div key={previousWorkout.id}>
            <h3>
              {previousWorkout.name} - {previousWorkout.date}
            </h3>

            {organizeWorkout(previousWorkout.workout).map(exercise => (
              <h3
                key={exercise.id}
              >{`${exercise.lift}: ${exercise.printout}`}</h3>
            ))}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default PreviousWorkoutApp;
