import React, { useState } from 'react';
import { alphabetize } from '../../functions/helpers';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { formatDate } from '../../functions/helpers';

const RecordList = ({ records }) => {
  const [selected, setSelected] = useState('#');
  const filtered =
    selected !== '#'
      ? records.filter(record => record.lift === selected)
      : records;
  const lifts = alphabetize([
    ...new Set([...records.map(record => record.lift)]),
  ]);
  const handleChange = e => {
    setSelected(e.target.value);
  };
  return (
    <>
      {records.length ? (
        <div>
          <select className='select' value={selected} onChange={handleChange}>
            <option key='#' value='#'>
              All Records
            </option>
            {lifts.map(lift => (
              <option key={lift} value={lift}>
                {lift}
              </option>
            ))}
          </select>
          <TransitionGroup className='scrollable'>
            {filtered.map(({ id, lift, printout, becameRecord, surpassed }) => (
              <CSSTransition
                className='record'
                key={id}
                timeout={500}
                classNames='fade'>
                <ul>
                  <li key={id}>
                    <h3>
                      {selected === '#' && `${lift}: `}
                      {printout}
                    </h3>
                    <h4>
                      {formatDate(becameRecord)}
                      {surpassed && ` - ${formatDate(surpassed)}`}
                    </h4>
                  </li>
                </ul>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      ) : (
        <>
          <h5>
            Your personal records will be displayed here along with the date you
            first acheived them:
          </h5>
          <h3>Bench Press: 3(10x135)</h3>
          <h4>3/6/21</h4>
          <h5>
            When you set a new personal record, you'll also see the date on
            which the previous one was broken:
          </h5>
          <h3>Bench Press: 3(10x145)</h3>
          <h4>3/20/21</h4>
          <h3>Bench Press: 3(10x135)</h3>
          <h4>3/6/21-3/20/21</h4>
          <h5>
            You can break a record by increasing the weight and/or reps and/or
            sets without decreasing any other field.
          </h5>
          <h5>
            Personal records will also be displayed in the New Workout widget to
            help you plan your routines.
          </h5>
        </>
      )}
    </>
  );
};

export default RecordList;
