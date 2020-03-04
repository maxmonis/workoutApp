import React, { Fragment, useState, useContext, useEffect } from 'react';

import ClientApp from '../clientComponents/ClientApp';
import WorkoutApp from './WorkoutApp';

import ClientContext from '../../context/client/clientContext';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const HomeApp = () => {
  const clientContext = useContext(ClientContext);
  const { clients, getClients, clearCurrentClient } = clientContext;
  useEffect(() => {
    getClients();
    // eslint-disable-next-line
  }, []);
  const [selectedClient, setSelectedClient] = useState(null);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    clearCurrentClient();
    setIsDialogOpen(false);
  };

  const handleChange = e => {
    clients.forEach(client => {
      if (client._id === e.target.value._id) setSelectedClient(client);
    });
  };

  return (
    <div style={{ marginTop: '200px' }}>
      {clients.length > 0 && (
        <Fragment>
          <InputLabel id='currentClient'>Client</InputLabel>
          <Select
            native
            style={{ width: '170px' }}
            labelId='currentClient'
            id='client'
            value={selectedClient}
            onChange={handleChange}
            input={<Input id='currentClient' />}
          >
            {clients.map(client => (
              <option key={client._id} value={client.name}>
                {client.name}
              </option>
            ))}
          </Select>
        </Fragment>
      )}
      <Button variant='outlined' color='primary' onClick={handleOpenDialog}>
        Edit Clients
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Edit Clients</DialogTitle>
        <DialogContent>
          <ClientApp />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Finished Editing Clients
          </Button>
        </DialogActions>
      </Dialog>
      {selectedClient && <WorkoutApp selectedClient={selectedClient} />}
    </div>
  );
};

export default HomeApp;
