import React, { useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import useToggle from '../../hooks/useToggle';

const RecordList = ({ records, selected }) => {
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
      <div className='scrollable small'>
        {filtered.map((record, i) => (
          <div key={record.id}>
            <ul className='pad-1'>
              <li key={record.id}>
                <strong>
                  {selected === '#' && `${record.lift}: `}
                  {record.printout}
                </strong>
                {selected === '#' ? (
                  <br />
                ) : record.surpassed ? (
                  ' from '
                ) : (
                  ' on '
                )}
                {record.becameRecord}
                {record.surpassed && ` to ${record.surpassed}`}
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

export default RecordList;
