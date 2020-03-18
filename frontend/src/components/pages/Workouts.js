import React from 'react';

import { Redirect } from 'react-router-dom';

import WorkoutApp from './WorkoutApp';

const Workouts = () => {
  const selectedClient = JSON.parse(
    window.localStorage.getItem('selectedClient')
  );
  if (selectedClient) return <WorkoutApp />;
  return <Redirect to='/' />;
};

export default Workouts;
