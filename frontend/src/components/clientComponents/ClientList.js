import React, { Fragment } from 'react';

import ClientItem from './ClientItem';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

const Clients = ({ clients }) => {
  return (
    <Fragment>
      <List>
        <Divider />
        {clients.map((client, index) => (
          <Fragment key={client._id}>
            <ClientItem client={client} />
            {index < clients.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </Fragment>
  );
};

export default Clients;
