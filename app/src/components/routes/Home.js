import React, { useContext, useState, useEffect } from 'react';
import {Spinner} from '../layout/UI';
import WorkoutApp from '../workout/WorkoutApp';
import AuthContext from '../../context/auth/authContext';
import ClientContext from '../../context/client/clientContext';

const Home = (props) => {
  const { user } = useContext(AuthContext);
  const { clients, updateClient } = useContext(ClientContext);
  const [selectedClient, setSelectedClient] = useState(null);
  useEffect(() => {
    if (clients.length === 1 && clients[0].name === '#') {
      updateClient({ ...clients[0], name: `# ${user.name}` });
    } else if (clients.length) {
      const { id } = props.match.params;
      setSelectedClient(
        clients.find((client) => client._id === id) || clients[0]
      );
    }
    // eslint-disable-next-line
  }, [clients]);
  return (
    <div className='full-size'>
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
