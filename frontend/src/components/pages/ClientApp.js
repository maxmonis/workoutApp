import React from 'react';

import ClientFilter from '../clientComponents/ClientFilter';
import ClientForm from '../clientComponents/ClientForm';
import ClientList from '../clientComponents/ClientList';

import Paper from '@material-ui/core/Paper';

const ClientApp = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
      }}
    >
      <ClientForm />
      <Paper style={{ width: '450px' }}>
        <ClientFilter />
        <ClientList />
      </Paper>
    </div>
  );
};

export default ClientApp;
