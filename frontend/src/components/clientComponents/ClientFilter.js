import React, { useContext, useEffect, useRef } from 'react';

import ClientContext from '../../context/client/clientContext';

const ClientFilter = () => {
  const clientContext = useContext(ClientContext);
  const text = useRef('');
  const {
    filterClients,
    clearFilteredClients,
    filteredClients
  } = clientContext;
  useEffect(() => {
    if (!filteredClients.length) {
      text.current.value = '';
    }
  });
  const handleChange = e => {
    if (text.current.value !== '') {
      filterClients(e.target.value);
    } else {
      clearFilteredClients();
    }
  };
  return (
    <form>
      <input
        style={{ height: '40px', fontSize: '20px' }}
        ref={text}
        type='text'
        placeholder='Search Clients...'
        onChange={handleChange}
      />
    </form>
  );
};
export default ClientFilter;
