import React, { useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

import ActiveClient from './ActiveClient';
import DeactivatedClient from './DeactivatedClient';

const ClientItem = ({ client }) => {
  const clientContext = useContext(ClientContext);
  const {
    deleteClient,
    updateClient,
    selectClient,
    setEditingClient,
    clearFilteredClients,
  } = clientContext;
  const { _id, name } = client;
  const clientName = name.length > 16 ? `${name.slice(0, 15).trim()}...` : name;
  const handleSelect = () => {
    clearFilteredClients();
    selectClient(client);
  };
  const handleEdit = () => {
    setEditingClient(client);
  };
  const handleDeactivate = () => {
    updateClient({ ...client, isActive: false });
  };
  const handleRecover = () => {
    updateClient({ ...client, isActive: true });
  };
  const handleDelete = () => {
    deleteClient(_id);
  };
  return client.isActive ? (
    <ActiveClient
      clientName={clientName}
      handleSelect={handleSelect}
      handleEdit={handleEdit}
      handleDeactivate={handleDeactivate}
    />
  ) : (
    <DeactivatedClient
      clientName={clientName}
      fullName={client.name}
      handleRecover={handleRecover}
      handleDelete={handleDelete}
    />
  );
};

export default ClientItem;
