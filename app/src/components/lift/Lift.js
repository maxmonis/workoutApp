import React from 'react';
import useInputState from '../../hooks/useInputState';
import useToggle from '../../hooks/useToggle';
import { strInput } from '../../functions/helpers';

const Lift = ({ lift, updateLifts }) => {
  const [isEditing, toggle] = useToggle(false);
  const [value, handleChange] = useInputState(lift);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateLifts(value.trim(), lift);
    toggle();
  };
  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            className='input'
            value={strInput(value)}
            onChange={handleChange}
            onBlur={toggle}
            autoFocus
          />
        </form>
      ) : (
        <h3
          aria-label={`Edit ${lift}`}
          onClick={toggle}
        >
          {lift}
        </h3>
      )}
    </li>
  );
};

export default Lift;
