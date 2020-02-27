import React, { useState, useContext, useEffect } from 'react';

import ClientContext from '../../context/client/clientContext';

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
        type: 'active',
        previousWorkouts: [],
        personalBests: []
      });
    }
  }, [clientContext, currentClient]);
  const [client, setClient] = useState(
    {
      name: '',
      email: '',
      phone: '',
      type: 'active',
      previousWorkouts: [],
      personalBests: []
    },
    [clientContext, currentClient]
  );
  const { name, email, phone, type } = client;
  const handleChange = e => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
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
    <form onSubmit={handleSubmit}>
      <h2>{currentClient ? 'Edit Client' : 'Add Client'}</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Email'
        name='email'
        value={email}
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={handleChange}
      />
      <h5>Client Status</h5>
      <input
        type='radio'
        name='type'
        value='active'
        checked={type === 'active'}
        onChange={handleChange}
      />{' '}
      Active{' '}
      <input
        type='radio'
        name='type'
        value='inactive'
        checked={type === 'inactive'}
        onChange={handleChange}
      />{' '}
      Inactive
      <div>
        <input
          type='submit'
          value={currentClient ? 'Save Changes' : 'Add Client'}
        />
      </div>
      <button onClick={handleClear}>Cancel</button>
    </form>
  );
};

export default ClientForm;
