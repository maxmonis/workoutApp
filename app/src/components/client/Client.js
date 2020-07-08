import React, { useContext } from 'react';
import ActiveClient from './ActiveClient';
import InactiveClient from './InactiveClient';
import ClientContext from '../../context/client/clientContext';

const Client = ({ client }) => {
  const { deleteClient, updateClient, setEditingClient } = useContext(
    ClientContext
  );
  const { _id, name, isActive } = client;
  const clientName = name.length > 17 ? `${name.slice(0, 16).trim()}...` : name;
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
  return isActive ? (
    <ActiveClient
      clientName={clientName}
      id={_id}
      handleEdit={handleEdit}
      handleDeactivate={handleDeactivate}
    />
  ) : (
    <InactiveClient
      clientName={clientName}
      name={name}
      handleActivate={handleActivate}
      handleDelete={handleDelete}
    />
  );
};

export default Client;
