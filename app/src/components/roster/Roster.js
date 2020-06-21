import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Client from '../client/Client';
import { alphabetize } from '../../functions/helpers';

const Roster = ({ clients, selectClient }) => {
  const active = clients.filter((client) => client.isActive);
  const deactivated = clients.filter((client) => !client.isActive);
  const sorted = [
    ...alphabetize(active, 'name'),
    ...alphabetize(deactivated, 'name'),
  ];
  return (
    <div className='scrollable'>
      <List>
        <Divider />
        {sorted.map((client) => (
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
