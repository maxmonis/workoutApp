import React from 'react';

export const Input = ({
  classes,
  name,
  value,
  type,
  handleBlur,
  handleChange,
  label,
  error,
}) => (
  <div className={`floating-label-input ${classes || ''}`}>
    <input
      className='input'
      name={name}
      required
      type={type || 'text'}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <span className='floating-label'>{label}</span>
    {error && <p className='input-error'>{error}</p>}
  </div>
);

export const Spinner = () => <div className='spinner' />;

export const Switch = ({ bool, toggle, label, tooltipContent }) => (
  <div className='switch-container'>
    <label
      className={`switch ${tooltipContent && 'tooltip bottom'}`}
      tooltip-content={tooltipContent}>
      <input type='checkbox' checked={bool} onChange={toggle} />
      <span className='slider'></span>
    </label>
    {label && <label className='switch-label'>{label}</label>}
  </div>
);
