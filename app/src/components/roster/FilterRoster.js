import React, { useContext, useEffect, useRef } from 'react';
import ClientContext from '../../context/client/clientContext';

const FilterRoster = () => {
  const clientContext = useContext(ClientContext);
  const text = useRef('');
  const {
    filterClients,
    clearFilteredClients,
    filteredClients,
  } = clientContext;
  useEffect(() => {
    if (!filteredClients.length) {
      text.current.value = '';
    }
  });
  const handleChange = (e) => {
    if (text.current.value !== '') {
      filterClients(e.target.value);
    } else {
      clearFilteredClients();
    }
  };
  return (
    <form>
      <input
        className='filter'
        ref={text}
        type='text'
        placeholder='Search...'
        onChange={handleChange}
        autoFocus
      />
    </form>
  );
};

export default FilterRoster;
