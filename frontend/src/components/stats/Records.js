import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { alphabetize } from '../../functions/helpers';
import useToggle from '../../hooks/useToggle';

const Records = ({ records }) => {
  const [selected, setSelected] = useState('All');
  const [displaySurpassed, toggle] = useToggle(false);
  const sorted = displaySurpassed
    ? records.filter((record) => record.surpassed)
    : records.filter((record) => !record.surpassed);
  const filtered =
    selected !== 'All'
      ? sorted.filter((record) => record.lift === selected)
      : sorted;
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
        {filtered.map((record, i) => (
          <div key={record.id}>
            <Typography variant='h6'>
              {record.becameRecord}
              {record.surpassed && ` - ${record.surpassed}`}
            </Typography>
            <ul className='left'>
              <li key={record.id}>
                {selected === 'All' && `${record.lift}: `}
                {record.printout}
              </li>
            </ul>
            {i < filtered.length - 1 && <Divider />}
          </div>
        ))}
      </div>
      {records.some(
        (record) =>
          record.surpassed && (record.lift === selected || selected === 'All')
      ) && (
        <FormControlLabel
          control={
            <Switch
              checked={displaySurpassed}
              onChange={toggle}
              color='primary'
            />
          }
          label='Broken Records'
        />
      )}
    </Paper>
  );
};

export default Records;
