import React, { useState, useContext, useEffect } from 'react';

import ClientContext from '../../context/client/clientContext';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const ClientForm = ({ closeForm }) => {
  const clientContext = useContext(ClientContext);
  const {
    addClient,
    updateClient,
    editingClient,
    clearEditingClient,
  } = clientContext;
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editingClient) {
      addClient(client);
      closeForm();
    } else {
      updateClient(client);
      handleClear();
    }
  };
  const handleClear = () => {
    clearEditingClient();
    closeForm();
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
          <Button onClick={handleClear}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
