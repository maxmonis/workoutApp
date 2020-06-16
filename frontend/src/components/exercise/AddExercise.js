import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const AddExercise = ({ lifts, handleChange, exercise, addExercise }) => {
  const { lift, sets, reps, weight } = exercise;
  const handleSubmit = (e) => {
    e.preventDefault();
    addExercise();
  };
  return (
    <form onSubmit={handleSubmit}>
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
        <option key={'Edit'} value=''>
          {'<<<Edit Exercises>>>'}
        </option>
      </Select>
      <div>
        <TextField
          className='field'
          id='sets'
          label='Sets'
          value={getNumStr(sets)}
          onChange={handleChange}
          inputProps={{
            pattern: '[0-9]*',
          }}
          InputLabelProps={{ shrink: !!sets }}
          autoFocus
        />
        <TextField
          className='field'
          id='reps'
          label='Reps'
          value={getNumStr(reps)}
          onChange={handleChange}
          inputProps={{
            pattern: '[0-9]*',
          }}
          InputLabelProps={{ shrink: !!reps }}
        />
        <TextField
          className='field'
          id='weight'
          label='Weight'
          value={getNumStr(weight)}
          onChange={handleChange}
          inputProps={{
            pattern: '[0-9]*',
          }}
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
  return typeof value === 'number'
    ? value.toString()
    : value.replace(/[^\d]/g, '');
}

export default AddExercise;
