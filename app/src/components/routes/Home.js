import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import WorkoutApp from '../workout/WorkoutApp';
import ClientContext from '../../context/client/clientContext';

const Home = (props) => {
  const clientContext = useContext(ClientContext);
  const { clients, updateClient, loading } = clientContext;
  const { id } = props.match.params;
  const selectedClient = clients.find((client) => client._id === id);
  return loading ? (
    <Spinner />
  ) : selectedClient ? (
    <WorkoutApp selectedClient={selectedClient} updateClient={updateClient} />
  ) : (
    <Redirect to='/' />
  );
};

export default Home;
