import React, { useContext } from 'react';
import ActiveClient from './ActiveClient';
import InactiveClient from './InactiveClient';
import ClientContext from '../../context/client/clientContext';

const Client = ({ client, selectClient }) => {
  const clientContext = useContext(ClientContext);
  const { deleteClient, updateClient, setEditingClient } = clientContext;
  const { _id, name } = client;
  const clientName = name.length > 16 ? `${name.slice(0, 15).trim()}...` : name;
  const handleSelect = () => {
    selectClient(_id);
  };
  const handleEdit = () => {
    setEditingClient(client);
  };
  const handleDeactivate = () => {
    updateClient({ ...client, isActive: false });
  };
  const handleActivate = () => {
    updateClient({ ...client, isActive: true });
  };
  const handleDelete = () => {
    deleteClient(_id);
  };
  return client.isActive ? (
    <ActiveClient
      name={clientName}
      handleSelect={handleSelect}
      handleEdit={handleEdit}
      handleDeactivate={handleDeactivate}
    />
  ) : (
    <InactiveClient
      name={clientName}
      fullName={client.name}
      handleActivate={handleActivate}
      handleDelete={handleDelete}
    />
  );
};

export default Client;
