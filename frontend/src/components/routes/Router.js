import React, { useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

import Spinner from '../layout/Spinner';
import WorkoutApp from '../workout/WorkoutApp';

const Router = (props) => {
  const clientContext = useContext(ClientContext);
  const { clients } = clientContext;
  const selectedClient = clients.find(
    (client) => client._id === props.match.params.id
  );
  return selectedClient ? (
    <WorkoutApp selectedClient={selectedClient} />
  ) : (
    <Spinner />
  );
};

export default Router;
