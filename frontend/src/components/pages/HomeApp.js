import React, { useContext } from 'react';

import ClientApp from '../clientComponents/ClientApp';
import WorkoutApp from './WorkoutApp';

import ClientContext from '../../context/client/clientContext';

const HomeApp = () => {
  const clientContext = useContext(ClientContext);
  const { currentClient } = clientContext;

  return (
    <div style={{ marginTop: '200px' }}>
      {currentClient ? (
        <WorkoutApp />
      ) : (
        <ClientApp />
      )}
    </div>
  );
};

export default HomeApp;
