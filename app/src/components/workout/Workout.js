import React, { useState, useEffect } from 'react';
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
  const handleSelect = () => {
    if (editingWorkout && editingWorkout.id === id) {
      selectWorkout(null);
    } else {
      selectWorkout(workout);
    }
  };
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
  const handleClick = () => handleSelect(workout.id);
  return (
    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <h4 onClick={handleToggle}>
        {fullDate.slice(0, -3)}
        <br />
        {selected === '#' && name}
      </h4>
      {isHovering && (
        <div>
          {!displayMessage ? (
            <div className='flex-row'>
              <IconButton color='inherit' onClick={toggle}>
                <DeleteIcon aria-label='Delete' />
              </IconButton>
              <IconButton color='inherit' onClick={handleClick}>
                <EditIcon aria-label='Edit' />
              </IconButton>
            </div>
          ) : (
            <h5>
              Click here
              <br />
              <DeleteIcon
                style={{ cursor: 'pointer' }}
                onClick={handleDelete}
              />
              <br />
              to delete workout
            </h5>
          )}
        </div>
      )}
      {editingWorkout && editingWorkout.id === id && (
        <h3 style={{ margin: '0' }}>Currently Editing</h3>
      )}
      <ul onClick={handleToggle}>
        {organizeRoutine(routine).map((exercise) => (
          <li
            className='mr-40'
            key={exercise.id}
          >{`${exercise.lift}: ${exercise.printout}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Workout;
