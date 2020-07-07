import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import WorkoutApp from '../workout/WorkoutApp';
import ClientContext from '../../context/client/clientContext';

const Home = (props) => {
  const { clients, addClient, updateClient } = useContext(
    ClientContext
  );
  if (clients.length === 0) {
    addClient({
      name: '#',
      lifts: ['Bench Press', 'Deadlift', 'Squat'],
      workouts: [],
      records: [],
    });
  }
  const { id } = props.match.params;
  const selectedClient = clients.find((client) => client._id === id);
  const user = clients.find((client) => client.name === '#');
  return selectedClient ? (
    <WorkoutApp selectedClient={selectedClient} updateClient={updateClient} />
  ) : id ? (
    <Redirect to='/' />
  ) : user ? (
    <WorkoutApp selectedClient={user} updateClient={updateClient} />
  ) : (
    <Spinner />
  );
};

export default Home;
