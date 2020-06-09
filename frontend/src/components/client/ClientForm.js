import React, { useState, useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

import { capitalize } from '../../functions/helpers';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const ClientForm = ({ reset }) => {
  const clientContext = useContext(ClientContext);
  const { addClient, updateClient, editingClient } = clientContext;
  const defaultClient = {
    name: '',
    email: '',
    phone: '',
    isActive: true,
    lifts: ['Bench Press', 'Deadlift', 'Squat'],
    exercises: [],
    workouts: [],
    records: [],
  };
  const initialClient = editingClient ? editingClient : defaultClient;
  const [client, setClient] = useState(initialClient);
  const { name, email, phone } = client;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editingClient) {
      addClient({ ...client, name: capitalize(name) });
    } else {
      updateClient({ ...client, name: capitalize(name) });
    }
    reset();
  };
  return (
    <div>
      <Typography variant='h6'>
        {editingClient ? 'Edit Client' : 'New Client'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={handleChange}
          autoFocus
          required
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
        <div>
          <Button color='primary' type='submit'>
            Save
          </Button>
          <Button onClick={reset}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
