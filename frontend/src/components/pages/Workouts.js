import React from 'react';

import { Redirect } from 'react-router-dom';

import WorkoutApp from './WorkoutApp';

const Workouts = () => {
  const selectedClient = JSON.parse(
    window.localStorage.getItem('selectedClient')
  );
  const initialWorkout = selectedClient
    ? JSON.parse(
        window.localStorage.getItem(
          `workout${selectedClient.name.replace(' ', '')}`
        )
      ) || []
    : [];
    
  if (selectedClient)
    return (
      <WorkoutApp
        selectedClient={selectedClient}
        initialWorkout={initialWorkout}
      />
    );
  return <Redirect to='/' />;
};

export default Workouts;
