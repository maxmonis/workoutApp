import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ClientContext from '../../context/client/clientContext';

const ClientForm = ({ reset }) => {
  const clientContext = useContext(ClientContext);
  const { addClient, updateClient, editingClient } = clientContext;
  const defaultClient = {
    name: '',
    email: '',
    phone: '',
    isActive: true,
    lifts: ['Bench Press', 'Deadlift', 'Squat'],
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
      addClient({ ...client, name: name.trim() });
    } else {
      updateClient({ ...client, name: name.trim() });
    }
    reset();
  };
  return (
    <div>
      <Typography variant='h6'>
        {editingClient ? 'Edit Client' : 'New Client'}
      </Typography>
      <form className='form' onSubmit={handleSubmit}>
        <TextField
          type='text'
          placeholder='Name'
          name='name'
          value={standardize(name)}
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
          <Button onClick={reset}>Cancel</Button>
          <Button color='primary' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

function standardize(string) {
  return string.replace(/[^a-z\s]/gi, '').replace(/[\s]+/, ' ');
}

export default ClientForm;
