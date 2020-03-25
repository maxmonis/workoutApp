import React, { useContext, useEffect, useState } from 'react';

import ClientApp from '../clientComponents/ClientApp';
import WorkoutApp from './WorkoutApp';

import ClientContext from '../../context/client/clientContext';

import Button from '@material-ui/core/Button';

const Home = () => {
  const clientContext = useContext(ClientContext);
  const { getClients } = clientContext;
  useEffect(() => {
    getClients();
    // eslint-disable-next-line
  }, []);

  const initialClient =
    JSON.parse(window.localStorage.getItem('selectedClient')) || null;
  const [selectedClient, setSelectedClient] = useState(initialClient);
  const selectClient = client => setSelectedClient(client);
  const initialWorkout = selectedClient
    ? JSON.parse(
        window.localStorage.getItem(
          `workout${selectedClient.name.replace(' ', '')}`
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
    window.localStorage.setItem(
      'selectedClient',
      JSON.stringify(selectedClient)
    );
    hideRoster();
  }, [selectedClient]);

  return (
    <div>
      {isDisplayingRoster ? (
        <ClientApp selectClient={selectClient} hideRoster={hideRoster} />
      ) : (
        <Button onClick={showRoster}>Show Roster</Button>
      )}
      {selectedClient && (
        <WorkoutApp
          key={selectedClient._id}
          selectedClient={selectedClient}
          initialWorkout={initialWorkout}
        />
      )}
    </div>
  );
};

export default Home;
