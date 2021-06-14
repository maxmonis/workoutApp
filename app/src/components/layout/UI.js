import React from 'react';

export const Input = ({
  name,
  value,
  type,
  handleBlur,
  handleChange,
  label,
  error,
  persistentLabel,
}) => (
  <div className='input-container'>
    <input
      className='input'
      name={name}
      required
      type={type || 'text'}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      pattern={type === 'number' ? '[0-9]*' : null}
    />
    <span className={persistentLabel ? 'persistent-label' : 'floating-label'}>
      {label}
    </span>
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
