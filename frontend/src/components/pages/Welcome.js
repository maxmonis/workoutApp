import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Welcome = () => {
  const handleClick = () => {};
  return (
    <div>
      <h1>Welcome to maxWellness</h1>
      {clients.length > 0 && (
        <select>
          {clients.map(client => (
            <option key={client._id}>{client.name}</option>
          ))}
        </select>
      )}
      <Button onClick={handleClick}>Manage Clients</Button>
    </div>
  );
};

export default Welcome;
