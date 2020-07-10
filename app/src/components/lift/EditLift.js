import React from 'react';
import TextField from '@material-ui/core/TextField';
import useInputState from '../../hooks/useInputState';
import { strInput } from '../../functions/helpers';

const EditLift = ({ lift, toggle, updateLifts }) => {
  const [value, handleChange, reset] = useInputState(lift);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateLifts(value.trim(), lift);
    reset();
    toggle();
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField value={strInput(value)} onChange={handleChange} autoFocus />
    </form>
  );
};

export default EditLift;
