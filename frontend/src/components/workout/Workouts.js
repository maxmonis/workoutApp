import React, { Fragment, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { alphabetize, getWeekday } from '../../functions/helpers';
import organizeRoutine from '../../functions/organizeRoutine';

const Workouts = ({ workouts, updateWorkouts }) => {
  const [selected, setSelected] = useState('');
  const [flagged, setFlagged] = useState(null);
  const filtered = selected
    ? workouts.filter((workout) => workout.name === selected)
    : workouts;
  const names = alphabetize([
    ...new Set([...workouts.map((workout) => workout.name)]),
  ]);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const handleClick = (e) => {
    const { value } = e.target;
    flagged === value ? setFlagged(null) : setFlagged(value);
  };
  const handleDelete = () => updateWorkouts(flagged);
  return (
    <Paper className='paper'>
      <Select
        native
        className='select'
        labelId='selected'
        value={selected}
        onChange={handleChange}
        input={<Input id='selected' />}
      >
        <option key={'#'} value=''>
          All Workouts
        </option>
        {names.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </Select>
      <div className='scrollable'>
        {filtered.map((workout, i) => {
          const { id, name, date, printout, routine } = workout;
          const weekday = getWeekday(date);
          return (
            <div key={id}>
              <button className='button' value={id} onClick={handleClick}>
                {!selected && (
                  <Fragment>
                    {name}
                    <br />
                  </Fragment>
                )}
                {weekday && `${weekday} `}
                {printout}
              </button>
              <div>
                {flagged === id && (
                  <IconButton onClick={handleDelete}>
                    <DeleteIcon aria-label='Delete' />
                  </IconButton>
                )}
              </div>
              <ul>
                {organizeRoutine(routine).map((exercise) => (
                  <li
                    className='move-left'
                    key={exercise.id}
                  >{`${exercise.lift}: ${exercise.printout}`}</li>
                ))}
              </ul>
              {i < filtered.length - 1 && <Divider />}
            </div>
          );
        })}
      </div>
    </Paper>
  );
};

export default Workouts;
