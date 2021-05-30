import React, { useEffect } from 'react';
import { Switch } from '../layout/UI';
import useToggle from '../../hooks/useToggle';

const RecordList = ({ records, selected }) => {
  const [displaySurpassed, toggle] = useToggle(false);
  const brokenRecords = records.filter(record => record.surpassed);
  const standingRecords = records.filter(record => !record.surpassed);
  const filtered = displaySurpassed ? brokenRecords : standingRecords;
  useEffect(() => {
    if (!brokenRecords.length && displaySurpassed) toggle();
    // eslint-disable-next-line
  }, [records]);
  return (
    <div>
      <div className='scrollable'>
        {filtered.map(record => (
          <div className='record' key={record.id}>
            <ul>
              <li key={record.id}>
                <strong>
                  {selected === '#' && `${record.lift}: `}
                  {record.printout}
                </strong>
                {record.surpassed ? ' from ' : ' on '}
                {record.becameRecord}
                {record.surpassed && ` to ${record.surpassed}`}
              </li>
            </ul>
          </div>
        ))}
      </div>
      {brokenRecords.length > 0 && (
        <Switch
          bool={displaySurpassed}
          toggle={toggle}
          label='Broken Records'
        />
      )}
    </div>
  );
};

export default RecordList;
