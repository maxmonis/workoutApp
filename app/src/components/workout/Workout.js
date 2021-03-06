import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import organizeRoutine from '../../functions/organizeRoutine';
import useToggle from '../../hooks/useToggle';

const Workout = ({
  workout,
  selected,
  editingWorkout,
  selectWorkout,
  updateWorkouts,
}) => {
  const { id, fullDate, name, routine } = workout;
  const [isHovering, setIsHovering] = useState(false);
  const [displayMessage, toggle] = useToggle(false);
  const handleSelect = () => selectWorkout(workout);
  const handleReset = () => selectWorkout(null);
  const handleEnter = () => setIsHovering(true);
  const handleLeave = () => setIsHovering(false);
  const handleToggle = () => setIsHovering(!isHovering);
  const handleDelete = () => updateWorkouts(id);
  useEffect(() => {
    const timer = setTimeout(() => displayMessage && toggle(), 2000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [displayMessage]);
  return (
    <div
      className='pad-1'
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <h4 style={{ marginBottom: '5px' }} onClick={handleToggle}>
        {fullDate.slice(0, -3)}
        <br />
        {selected === '#' && name}
      </h4>
      {editingWorkout && editingWorkout.id === id ? (
        <div>
          <h2>Currently Editing</h2>
          <Button onClick={handleReset} color='primary'>
            Discard Changes
          </Button>
        </div>
      ) : displayMessage ? (
        <h5 className='pad-1'>
          Click here
          <br />
          <DeleteIcon style={{ cursor: 'pointer' }} onClick={handleDelete} />
          <br />
          to delete workout
        </h5>
      ) : isHovering ? (
        <div className='flex-row'>
          <IconButton color='inherit' onClick={handleSelect}>
            <EditIcon aria-label='Edit' />
          </IconButton>
          <IconButton color='inherit' onClick={toggle}>
            <DeleteIcon aria-label='Delete' />
          </IconButton>
        </div>
      ) : null}
      <ul onClick={handleToggle}>
        {organizeRoutine(routine).map((exercise) => (
          <li key={exercise.id}>{`${exercise.lift}: ${exercise.printout}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Workout;
