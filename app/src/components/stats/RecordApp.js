import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
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
    <Paper className='paper res'>
      <Select
        native
        className='select'
        labelId='selected'
        value={selected}
        onChange={handleChange}
        input={<Input id='selected' />}
      >
        <option key='#' value='#'>
          All Records
        </option>
        {lifts.map((lift) => (
          <option key={lift} value={lift}>
            {lift}
          </option>
        ))}
      </Select>
      <RecordList records={filtered} selected={selected} />
    </Paper>
  );
};

export default RecordApp;
