import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { alphabetize } from '../../functions/helpers';
import organizeRoutine from '../../functions/organizeRoutine';

const Workouts = ({ workouts, updateWorkouts, selectWorkout }) => {
  const [selected, setSelected] = useState('#');
  const [flagged, setFlagged] = useState(null);
  const [displayMessage, setDisplayMessage] = useState(false);
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
  const handleSelect = () => {
    const workout = workouts.find((workout) => workout.id === flagged);
    selectWorkout(workout);
  };
  const showMessage = () => {
    setDisplayMessage(true);
    setTimeout(() => {
      setDisplayMessage(false);
    }, 2000);
  };
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
        {filtered.map((workout, i) => (
          <div key={workout.id}>
            <button className='button' value={workout.id} onClick={handleClick}>
              {workout.fullDate.slice(0, -3)}
              <br />
              {selected === '#' && workout.name}
            </button>
            <div>
              {flagged === workout.id && (
                <div>
                  <div className='flex-row'>
                    <IconButton
                      color='inherit'
                      onClick={showMessage}
                      onDoubleClick={handleDelete}
                    >
                      <DeleteIcon aria-label='Delete' />
                    </IconButton>
                    <IconButton color='inherit' onClick={handleSelect}>
                      <EditIcon aria-label='Edit' />
                    </IconButton>
                  </div>
                  {displayMessage && (
                    <h5>
                      Double-click
                      <br />
                      <DeleteIcon />
                      <br />
                      to delete workout
                    </h5>
                  )}
                </div>
              )}
            </div>
            <ul>
              {organizeRoutine(workout.routine).map((exercise) => (
                <li
                  className='move-left'
                  key={exercise.id}
                >{`${exercise.lift}: ${exercise.printout}`}</li>
              ))}
            </ul>
            {i < filtered.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default Workouts;
