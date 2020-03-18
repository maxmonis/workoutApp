import React, { useState } from 'react';

import ClientFilter from './ClientFilter';
import ClientForm from './ClientForm';
import { Button } from '@material-ui/core';

const ClientApp = () => {
  const [isAddingClient, setIsAddingClient] = useState(false);
  const handleToggle = () => {
    isAddingClient ? setIsAddingClient(false) : setIsAddingClient(true);
  };
  return (
    <div>
      {isAddingClient ? (
        <ClientForm handleToggle={handleToggle} />
      ) : (
        <Button onClick={handleToggle}>Add New Client</Button>
      )}
      <ClientFilter />
    </div>
  );
};

export default ClientApp;
