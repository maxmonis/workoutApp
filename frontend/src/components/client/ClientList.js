import React, { Fragment } from 'react';

import ClientItem from './ClientItem';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

const ClientList = ({ clients }) => {
  return (
    <div className='scrollable'>
      <List>
        <Divider />
        {clients.map((client) => (
          <Fragment key={client.name}>
            <ClientItem client={client} />
            <Divider />
          </Fragment>
        ))}
      </List>
    </div>
  );
};

export default ClientList;
