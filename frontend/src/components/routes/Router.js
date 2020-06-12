import React, { useContext } from 'react';
import ClientApp from '../client/ClientApp';
import WorkoutApp from '../workout/WorkoutApp';
import Spinner from '../layout/Spinner';
import ClientContext from '../../context/client/clientContext';
import AuthContext from '../../context/auth/authContext';

const Router = (props) => {
  const clientContext = useContext(ClientContext);
  const authContext = useContext(AuthContext);
  const { clients, loading } = clientContext;
  const selectedClient = clients.find(
    (client) => client._id === props.match.params.id
  );
  const handleSelect = (id) => {
    props.history.push(`/${id}`);
  };
  return loading || authContext.loading ? (
    <Spinner />
  ) : selectedClient ? (
    <WorkoutApp selectedClient={selectedClient} />
  ) : (
    <ClientApp clients={clients} handleSelect={handleSelect} />
  );
};

export default Router;
