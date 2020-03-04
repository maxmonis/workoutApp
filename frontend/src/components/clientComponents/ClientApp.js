import React from 'react';

import Clients from './Clients';
import ClientForm from './ClientForm';
import ClientFilter from './ClientFilter';

const ClientApp = () => {
  return (
    <div>
      <ClientForm />
      <ClientFilter />
      <Clients />
    </div>
  );
};

export default ClientApp;
