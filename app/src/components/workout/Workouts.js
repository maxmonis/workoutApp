import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { alphabetize } from '../../functions/helpers';
import organizeRoutine from '../../functions/organizeRoutine';

const Workouts = ({ workouts, updateWorkouts, selectWorkout }) => {
  const [selected, setSelected] = useState('#');
  const [flagged, setFlagged] = useState(null);
  const filtered =
    selected !== '#'
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
  const handleEdit = () => selectWorkout(flagged);
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
        <option key='#' value='#'>
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
          const { id, name, fullDate, routine } = workout;
          return (
            <div key={id}>
              <button className='button' value={id} onClick={handleClick}>
                {fullDate.slice(0, -3)}
                <br />
                {selected === '#' && name}
              </button>
              <div>
                {flagged === id && (
                  <div
                    style={{
                      display: 'flex',
                      flex: 'row',
                      justifyContent: 'center',
                    }}
                  >
                    <IconButton onClick={handleDelete}>
                      <DeleteIcon aria-label='Delete' />
                    </IconButton>
                    <IconButton onClick={handleEdit}>
                      <EditIcon aria-label='Edit' />
                    </IconButton>
                  </div>
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
