import React, { useContext, useEffect, useRef } from 'react';
import ClientContext from '../../context/client/clientContext';

const FilterRoster = () => {
  const { filterClients, clearFilteredClients, filteredClients } = useContext(
    ClientContext
  );
  const text = useRef('');
  useEffect(() => {
    if (!filteredClients.length) {
      text.current.value = '';
    }
  });
  const handleChange = (e) => {
    text.current.value = text.current.value.replace(/[^a-z]/gi, '');
    if (text.current.value !== '') {
      filterClients(e.target.value);
    } else {
      clearFilteredClients();
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
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
