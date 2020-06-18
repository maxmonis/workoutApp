import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Client from '../client/Client';

const Roster = ({ clients, selectClient }) => {
  return (
    <div className='scrollable'>
      <List>
        <Divider />
        {clients.map((client) => (
          <Fragment key={client.name}>
            <Client client={client} selectClient={selectClient} />
            <Divider />
          </Fragment>
        ))}
      </List>
    </div>
  );
};

export default Roster;
