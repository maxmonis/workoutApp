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
    // eslint-disable-next-line
  }, [clients.length]);
  return (
    <div className='page'>
      {selectedClient ? (
        <WorkoutApp
          selectedClient={selectedClient}
          updateClient={updateClient}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Home;
