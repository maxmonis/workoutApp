import React, { useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import useToggle from '../../hooks/useToggle';

const Records = ({ records, selected }) => {
  const [displaySurpassed, toggle] = useToggle(false);
  const brokenRecords = records.filter((record) => record.surpassed);
  const standingRecords = records.filter((record) => !record.surpassed);
  const filtered = displaySurpassed ? brokenRecords : standingRecords;
  useEffect(() => {
    if (!brokenRecords.length && displaySurpassed) toggle();
    // eslint-disable-next-line
  }, [records]);
  return (
    <div>
      <div className='scrollable'>
        {filtered.map((record, i) => (
          <div key={record.id}>
            <Typography variant='h6'>
              {record.becameRecord}
              {record.surpassed && ` - ${record.surpassed}`}
            </Typography>
            <ul className='left'>
              <li key={record.id}>
                {!selected && `${record.lift}: `}
                {record.printout}
              </li>
            </ul>
            {i < filtered.length - 1 && <Divider />}
          </div>
        ))}
      </div>
      {brokenRecords.length > 0 && (
        <div>
          <Divider />
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
        </div>
      )}
    </div>
  );
};

export default Records;
