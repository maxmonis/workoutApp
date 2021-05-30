import React from 'react';
import {Input} from '../layout/UI';
import useInputState from '../../hooks/useInputState';
import { strInput } from '../../functions/helpers';

const AddLift = ({ updateLifts }) => {
  const [value, handleChange, reset] = useInputState('');
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        value && updateLifts(value.trim());
        reset();
      }}
    >
      <Input
        className='input full-size'
        value={strInput(value)}
        handleChange={handleChange}
        label='Add New Exercise'
        fullWidth
        autoFocus={true}
      />
    </form>
  );
};

export default AddLift;
