import React, { useState, useEffect, useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import organizeRoutine from '../../functions/organizeRoutine';
import useToggle from '../../hooks/useToggle';
import AlertContext from '../../context/alert/alertContext';
import { formatDate } from '../../functions/helpers';
const Workout = ({
  workout,
  selected,
  editingWorkout,
  selectWorkout,
  updateWorkouts,
}) => {
  const { setAlert } = useContext(AlertContext);
  const { id, date, name, routine } = workout;
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);
  const [displayConfirmation, toggle] = useToggle(false);
  const handleSelect = () => selectWorkout(workout);
  const handleReset = () => selectWorkout(null);
  const handleToggle = () => setIsMenuDisplayed(!isMenuDisplayed);
  const handleDelete = () => {
    setAlert('Workout Deleted', 'success');
    updateWorkouts(id);
  };
  useEffect(() => {
    const timer = setTimeout(() => displayConfirmation && toggle(), 2500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [displayConfirmation]);
  return (
    <div className='workout'>
      <h3 onClick={handleToggle}>{selected === '#' && `${name} - `}{formatDate(date)}</h3>
      <ul onClick={handleToggle}>
        {organizeRoutine(routine).map(exercise => (
          <li key={exercise.id}>
            <h4>{`${exercise.lift}: ${exercise.printout}`}</h4>
          </li>
        ))}
      </ul>
      {editingWorkout && editingWorkout.id === id ? (
        <>
          <h4>Currently Editing</h4>
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
