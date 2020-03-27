import React, { useState, useContext, useEffect } from 'react';

import uuid from 'uuid/v4';

import ClientContext from '../../context/client/clientContext';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const ClientForm = ({ closeDialog }) => {
  const clientContext = useContext(ClientContext);
  const {
    addClient,
    updateClient,
    editingClient,
    clearEditingClient
  } = clientContext;
  const defaultClient = {
    name: '',
    email: '',
    phone: '',
    isActive: true,
    lifts: [
      { id: uuid(), liftName: 'Bench Press' },
      { id: uuid(), liftName: 'Deadlift' },
      { id: uuid(), liftName: 'Squat' }
    ],
    previousWorkouts: [],
    personalBests: [],
    lastAccessed: Date.now()
  };
  useEffect(() => {
    if (editingClient) {
      setClient(editingClient);
    } else {
      setClient(defaultClient);
    }
    // eslint-disable-next-line
  }, [clientContext, editingClient]);
  const [client, setClient] = useState(defaultClient);
  const { name, email, phone } = client;
  const handleChange = e => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!editingClient) {
      addClient(client);
      closeDialog();
    } else {
      updateClient(client);
      handleClear();
    }
  };
  const handleClear = () => {
    clearEditingClient();
    closeDialog();
  };
  return (
    <Paper style={{ padding: '20px' }}>
      <div style={{ width: '200px' }}>
        {editingClient ? (
          <Typography variant='h6'>Update {editingClient.name}</Typography>
        ) : client.name ? (
          <Typography variant='h6'>Add {client.name}</Typography>
        ) : (
          <Typography variant='h6'>Add New Client</Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            type='text'
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleChange}
          />
          <TextField
            type='text'
            placeholder='Phone'
            name='phone'
            value={phone}
            onChange={handleChange}
          />
          {client.name !== '' && <Button type='submit'>Save</Button>}
          <Button onClick={handleClear}>Cancel</Button>
        </form>
      </div>
    </Paper>
  );
};

export default ClientForm;
