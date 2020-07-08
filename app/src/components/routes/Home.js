import React, { useContext, useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import WorkoutApp from '../workout/WorkoutApp';
import ClientContext from '../../context/client/clientContext';

const Home = (props) => {
  const { clients, updateClient } = useContext(ClientContext);
  const [selectedClient, setSelectedClient] = useState(null);
  useEffect(() => {
    if (clients.length) {
      const { id } = props.match.params;
      setSelectedClient(
        clients.find((client) => client._id === id) || clients[0]
      );
    }
  }, [clients.length]);
  return selectedClient ? (
    <WorkoutApp selectedClient={selectedClient} updateClient={updateClient} />
  ) : (
    <Spinner />
  );
};

export default Home;
