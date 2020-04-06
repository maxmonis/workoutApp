import React, { useContext, useEffect, useState } from 'react';

import ClientApp from '../clientComponents/ClientApp';
import WorkoutApp from '../workoutComponents/WorkoutApp';

import ClientContext from '../../context/client/clientContext';

import Button from '@material-ui/core/Button';

const Home = () => {
  const clientContext = useContext(ClientContext);
  const { clients, getClients, selectedClient } = clientContext;
  useEffect(() => {
    getClients();
    // eslint-disable-next-line
  }, []);

  const currentClient = selectedClient
    ? selectedClient
    : JSON.parse(window.localStorage.getItem('selectedClient')) || null;
  const initialWorkout = currentClient
    ? JSON.parse(
        window.localStorage.getItem(
          `workout${currentClient.name.replace(' ', '')}`
        )
      ) || []
    : [];

  const [isDisplayingRoster, setIsDisplayingRoster] = useState(true);
  const showRoster = () => {
    setIsDisplayingRoster(true);
  };
  const hideRoster = () => {
    setIsDisplayingRoster(false);
  };

  useEffect(() => {
    console.log('useEffect');
    window.localStorage.setItem(
      'selectedClient',
      JSON.stringify(currentClient)
    );
    currentClient ? hideRoster() : showRoster();
    // eslint-disable-next-line
  }, [selectedClient]);

  return (
    <div>
      {isDisplayingRoster ? (
        <ClientApp clients={clients} hideRoster={hideRoster} />
      ) : (
        <Button color='primary' onClick={showRoster}>
          Show Roster
        </Button>
      )}
      {currentClient && (
        <WorkoutApp
          key={currentClient._id}
          currentClient={currentClient}
          initialWorkout={initialWorkout}
        />
      )}
    </div>
  );
};

export default Home;
