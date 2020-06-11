import React, { useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

import Spinner from '../layout/Spinner';
import Controller from './Controller';

const Router = (props) => {
  const clientContext = useContext(ClientContext);
  const { clients } = clientContext;
  const selectedClient = clients.find(
    (client) => client._id === props.match.params.id
  );
  return selectedClient ? (
    <Controller selectedClient={selectedClient} />
  ) : (
    <Spinner />
  );
};

export default Router;
