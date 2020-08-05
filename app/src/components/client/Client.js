import React, { useContext } from 'react';
import ActiveClient from './ActiveClient';
import InactiveClient from './InactiveClient';
import ClientContext from '../../context/client/clientContext';

const Client = ({ client, toggle }) => {
  const { deleteClient, updateClient, setEditingClient } = useContext(
    ClientContext
  );
  const { _id, name, isActive } = client;
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
      name={name}
      toggle={toggle}
      id={_id}
      handleEdit={handleEdit}
      handleDeactivate={handleDeactivate}
    />
  ) : (
    <InactiveClient
      name={name}
      handleActivate={handleActivate}
      handleDelete={handleDelete}
    />
  );
};

export default Client;
