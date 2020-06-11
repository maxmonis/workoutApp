import React, { useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

import ClientApp from '../client/ClientApp';
import Controller from './Controller';
import Spinner from '../layout/Spinner';

const Router = (props) => {
  const clientContext = useContext(ClientContext);
  const { clients, loading } = clientContext;
  const selectedClient = clients.find(
    (client) => client._id === props.match.params.id
  );
  const handleSelect = (id) => {
    props.history.push(`/${id}`);
  };
  return loading ? (
    <Spinner />
  ) : selectedClient ? (
    <Controller selectedClient={selectedClient} />
  ) : (
    <ClientApp clients={clients} handleSelect={handleSelect} />
  );
};

export default Router;
