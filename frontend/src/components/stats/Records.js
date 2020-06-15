import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { alphabetize } from '../../functions/helpers';

const Records = ({ records }) => {
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
      <div className='scrollable'>
        {filtered.map((record) => (
          <div key={record.id}>
            <Typography variant='h6'>{record.date}</Typography>
            <ul className='left'>
              <li key={record.id}>{`${record.lift}: ${record.printout}`}</li>
            </ul>
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default Records;
