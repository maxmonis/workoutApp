import React from 'react';
import WorkoutApp from '../workoutComponents/WorkoutApp';
import Clients from '../clientComponents/Clients';
import ClientForm from '../clientComponents/ClientForm';
import ClientFilter from '../clientComponents/ClientFilter';

const HomeApp = () => {
  return (
    <div>
      <WorkoutApp />
      <ClientForm />
      <ClientFilter />
      <Clients />
    </div>
  );
};

export default HomeApp;
