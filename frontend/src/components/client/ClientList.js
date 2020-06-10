import React, { Fragment } from 'react';

import ClientItem from './ClientItem';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

const ClientList = ({ clients, selectClient }) => {
  return (
    <div className='scrollable'>
      <List>
        <Divider />
        {clients.map((client) => (
          <Fragment key={client.name}>
            <ClientItem client={client} selectClient={selectClient} />
            <Divider />
          </Fragment>
        ))}
      </List>
    </div>
  );
};

export default ClientList;
