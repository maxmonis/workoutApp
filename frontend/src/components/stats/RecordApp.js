import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Records from './Records';
import { alphabetize } from '../../functions/helpers';

const RecordApp = ({ records }) => {
  const [selected, setSelected] = useState('All');
  const filtered =
    selected !== 'All'
      ? records.filter((record) => record.lift === selected)
      : records;
  const lifts = alphabetize([
    ...new Set(['All', ...records.map((record) => record.lift)]),
  ]);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  return (
    <Paper className='container'>
      <Select
        native
        className='select'
        labelId='selected'
        value={selected}
        onChange={handleChange}
        input={<Input id='selected' />}
      >
        {lifts.map((lift) => (
          <option key={lift} value={lift}>
            {lift}
          </option>
        ))}
      </Select>
      <Records records={filtered} selected={selected} />
    </Paper>
  );
};

export default RecordApp;
