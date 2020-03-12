import React, { useContext } from 'react';

import { Redirect } from 'react-router-dom';

import ClientContext from '../../context/client/clientContext';

import WorkoutApp from './WorkoutApp';

const Workouts = () => {
  const clientContext = useContext(ClientContext);
  const { currentClient } = clientContext;
  if (currentClient) return <WorkoutApp />;
  return <Redirect to='/' />;
};

export default Workouts;
