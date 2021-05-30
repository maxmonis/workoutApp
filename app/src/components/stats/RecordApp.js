import React, { useState } from 'react';
import RecordList from './RecordList';
import { alphabetize } from '../../functions/helpers';

const RecordApp = ({ records }) => {
  const [selected, setSelected] = useState('#');
  const filtered =
    selected !== '#'
      ? records.filter((record) => record.lift === selected)
      : records;
  const lifts = alphabetize([
    ...new Set([...records.map((record) => record.lift)]),
  ]);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  return (
    <div>
      <select
        className='select'
        value={selected}
        onChange={handleChange}
      >
        <option key='#' value='#'>
          All Records
        </option>
        {lifts.map((lift) => (
          <option key={lift} value={lift}>
            {lift}
          </option>
        ))}
      </select>
      <RecordList records={filtered} selected={selected} />
    </div>
  );
};

export default RecordApp;
