import React from 'react';

import useClientState from '../../hooks/useClientState';

const WorkoutApp = ({selectedClient}) => {
  const { client } = useClientState(selectedClient);
  return (
    <div>
      <h1>{client.name}</h1>
    </div>
  );
};

export default WorkoutApp;
