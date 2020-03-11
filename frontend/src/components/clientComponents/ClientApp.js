import React from 'react';

import ClientFilter from './ClientFilter';
import ClientForm from './ClientForm';
import ClientList from './ClientList';

const ClientApp = () => {
  return (
    <div>
      <ClientForm />
      <ClientFilter />
      <ClientList />
    </div>
  );
};

export default ClientApp;
