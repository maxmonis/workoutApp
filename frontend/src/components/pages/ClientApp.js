import React from 'react';

import ClientFilter from '../clientComponents/ClientFilter';
import ClientForm from '../clientComponents/ClientForm';
import ClientList from '../clientComponents/ClientList';

const ClientApp = () => {
  return (
    <div style={{ marginTop: '100px' }}>
      <ClientForm />
      <ClientFilter />
      <ClientList />
    </div>
  );
};

export default ClientApp;
