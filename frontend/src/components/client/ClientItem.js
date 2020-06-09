import React, { useState, useContext, useEffect } from 'react';

import ActiveClient from './ActiveClient';
import DeactivatedClient from './DeactivatedClient';

import ClientContext from '../../context/client/clientContext';

const ClientItem = ({ client }) => {
  const clientContext = useContext(ClientContext);
  const {
    deleteClient,
    updateClient,
    setEditingClient,
    clearEditingClient,
    clearFilteredClients,
  } = clientContext;
  const [currentClient, setCurrentClient] = useState(client);
  const { _id, name } = currentClient;
  const clientName = name.length > 18 ? `${name.slice(0, 17).trim()}...` : name;
  useEffect(() => {
    updateClient(currentClient);
    // eslint-disable-next-line
  }, [currentClient]);
  const handleSelect = () => {
    clearFilteredClients();
    setCurrentClient(client);
  };
  const handleEdit = () => {
    setEditingClient(client);
  };
  const handleDeactivate = () => {
    setCurrentClient({ ...currentClient, isActive: false });
  };
  const handleRecover = () => {
    setCurrentClient({ ...currentClient, isActive: true });
  };
  const handleDelete = () => {
    deleteClient(_id);
    clearEditingClient();
  };
  return client.isActive ? (
    <ActiveClient
      clientName={clientName}
      handleSelect={handleSelect}
      handleEdit={handleEdit}
      handleDeactivate={handleDeactivate}
      key={_id}
    />
  ) : (
    <DeactivatedClient
      clientName={clientName}
      fullName={client.name}
      handleRecover={handleRecover}
      handleDelete={handleDelete}
      key={_id}
    />
  );
};

export default ClientItem;
