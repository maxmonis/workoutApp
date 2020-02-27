import React, { useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

const ClientItem = ({ client }) => {
  const clientContext = useContext(ClientContext);
  const { deleteClient, setCurrentClient, clearCurrentClient } = clientContext;
  const {
    id,
    name,
    email,
    phone,
    type,
    previousWorkouts,
    personalBests
  } = client;
  const handleEdit = () => {
    setCurrentClient(client);
  };
  const handleDelete = () => {
    deleteClient(id);
    clearCurrentClient();
  };
  return (
    <div key={id}>
      <h3>
        {name} {email} {phone} {type}
      </h3>
      {previousWorkouts.length > 0 && (
        <ul>
          {previousWorkouts.map(previousWorkout =>
            previousWorkout.workout.map(exercise => (
              <li key={exercise}>{exercise}</li>
            ))
          )}
        </ul>
      )}
      {personalBests.length > 0 && (
        <ul>
          {personalBests.map(personalBest => (
            <li key={personalBest.id}>
              {personalBest.lift}: {personalBest.printout}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ClientItem;
