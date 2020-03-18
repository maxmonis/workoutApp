import React from 'react';

import ClientApp from '../clientComponents/ClientApp';
import ClientList from '../clientComponents/ClientList';

import Paper from '@material-ui/core/Paper';

const HomeApp = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
      }}
    >
      <Paper style={{ width: '450px' }}>
        <ClientApp />
        <ClientList />
      </Paper>
    </div>
  );
};

export default HomeApp;
