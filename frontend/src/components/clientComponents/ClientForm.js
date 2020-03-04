import React, { useState, useContext, useEffect } from 'react';

import uuid from 'uuid/v4';

import ClientContext from '../../context/client/clientContext';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const ClientForm = () => {
  const clientContext = useContext(ClientContext);
  const {
    addClient,
    updateClient,
    currentClient,
    clearCurrentClient
  } = clientContext;
  useEffect(() => {
    if (currentClient) {
      setClient(currentClient);
    } else {
      setClient({
        name: '',
        email: '',
        phone: '',
        active: true,
        lifts: [
          { id: uuid(), liftName: 'Bench Press' },
          { id: uuid(), liftName: 'Deadlift' },
          { id: uuid(), liftName: 'Squat' }
        ],
        previousWorkouts: [],
        personalBests: []
      });
    }
  }, [clientContext, currentClient]);
  const [client, setClient] = useState({
    name: '',
    email: '',
    phone: '',
    active: true,
    lifts: [
      { id: uuid(), liftName: 'Bench Press' },
      { id: uuid(), liftName: 'Deadlift' },
      { id: uuid(), liftName: 'Squat' }
    ],
    previousWorkouts: [],
    personalBests: []
  });
  const { name, email, phone, active } = client;
  const handleChange = e => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };
  const handleToggle = () => {
    setClient({ ...client, active: !active });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!currentClient) {
      addClient(client);
    } else {
      updateClient(client);
      handleClear();
    }
  };
  const handleClear = () => {
    clearCurrentClient();
  };
  return (
    <Paper>
      <form onSubmit={handleSubmit}>
        <TextField
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={handleChange}
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
        <input
          type='checkbox'
          name='status'
          value={active}
          checked={active}
          onChange={handleToggle}
        />
        Active
        <div>
          <Button type='submit' variant='outlined'>
            {currentClient ? 'Save Changes' : 'Add Client'}
          </Button>
          <Button variant='outlined' onClick={handleClear}>
            Cancel
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default ClientForm;
