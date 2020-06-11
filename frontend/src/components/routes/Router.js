import React, { useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

import ClientApp from '../client/ClientApp';
import Spinner from '../layout/Spinner';
import Controller from './Controller';

const Router = (props) => {
  const clientContext = useContext(ClientContext);
  const { clients } = clientContext;
  const id = props.match.params.id;
  const selectedClient = clients.find((client) => client._id === id);
  const handleSelect = (id) => {
    props.history.push(`/${id}`);
  };
  return !id ? (
    <ClientApp clients={clients} handleSelect={handleSelect} />
  ) : selectedClient ? (
    <Controller selectedClient={selectedClient} />
  ) : (
    <Spinner duration={3000} />
  );
};

export default Router;
