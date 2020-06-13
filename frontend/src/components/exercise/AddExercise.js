import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const AddExercise = ({ lifts, handleChange, exercise, addExercise }) => {
  const { lift, sets, reps, weight } = exercise;
  return (
    <form onSubmit={addExercise}>
      <Select
        className='select'
        native
        id='lift'
        value={lift}
        onChange={handleChange}
        input={<Input />}
      >
        {lifts.map((lift) => (
          <option key={lift} value={lift}>
            {lift}
          </option>
        ))}
      </Select>
      <div>
        <TextField
          className='field'
          id='sets'
          label='Sets'
          value={getNumStr(sets)}
          onChange={handleChange}
          InputLabelProps={{ shrink: !!sets }}
          autoFocus
        />
        <TextField
          className='field'
          id='reps'
          label='Reps'
          value={getNumStr(reps)}
          onChange={handleChange}
          InputLabelProps={{ shrink: !!reps }}
        />
        <TextField
          className='field'
          id='weight'
          label='Weight'
          value={getNumStr(weight)}
          onChange={handleChange}
          InputLabelProps={{ shrink: !!weight }}
          required
        />
      </div>
      <Button type='submit' color='primary'>
        Enter
      </Button>
    </form>
  );
};

function getNumStr(value) {
  if (!value) return '';
  return typeof value === 'string'
    ? value.replace(/[^\d]/g, '')
    : value.toString();
}

export default AddExercise;
