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
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);
  const [displayConfirmation, toggle] = useToggle(false);
  const handleSelect = () => selectWorkout(workout);
  const handleReset = () => selectWorkout(null);
  const handleToggle = () => setIsMenuDisplayed(!isMenuDisplayed);
  const handleDelete = () => updateWorkouts(id);
  useEffect(() => {
    const timer = setTimeout(() => displayConfirmation && toggle(), 2500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [displayConfirmation]);
  return (
    <div className='workout'>
      <h6 onClick={handleToggle}>
        {fullDate.slice(0, -3)}
        <br />
        {selected === '#' && name}
      </h6>
      <ul onClick={handleToggle}>
        {organizeRoutine(routine).map(exercise => (
          <li key={exercise.id}>{`${exercise.lift}: ${exercise.printout}`}</li>
        ))}
      </ul>
      {editingWorkout && editingWorkout.id === id ? (
        <>
          <h6>Currently Editing</h6>
          <button onClick={handleReset} className='btn'>
            Discard Changes
          </button>
        </>
      ) : displayConfirmation ? (
        <p>
          Click here
          <br />
          <DeleteIcon onClick={handleDelete} />
          <br />
          to delete workout
        </p>
      ) : isMenuDisplayed ? (
        <>
          <IconButton color='inherit' onClick={handleSelect}>
            <EditIcon aria-label='Edit' />
          </IconButton>
          <IconButton color='inherit' onClick={toggle}>
            <DeleteIcon aria-label='Delete' />
          </IconButton>
        </>
      ) : null}
    </div>
  );
};

export default Workout;
