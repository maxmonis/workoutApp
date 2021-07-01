import React, { useState, useEffect, useContext } from 'react';
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
  const handleDelete = () => {
    updateWorkouts(id);
    setAlert('Workout Deleted', 'success');
  };
  useEffect(() => {
    const timer = setTimeout(() => displayConfirmation && toggle(), 2500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [displayConfirmation]);
  return (
    <>
      <h3
        className='pointer'
        onClick={() => setIsMenuDisplayed(!isMenuDisplayed)}>
        {selected === '#' && `${name} - `}
        {formatDate(date)}
      </h3>
      {editingWorkout && editingWorkout.id === id ? (
        <button onClick={() => selectWorkout(null)} className='btn'>
          Discard Changes
        </button>
      ) : displayConfirmation ? (
        <button onClick={handleDelete} className='btn'>
          Confirm Deletion
        </button>
      ) : isMenuDisplayed ? (
        <>
          <button onClick={() => selectWorkout(workout)} className='btn'>
            Edit
          </button>
          <button onClick={toggle} className='btn'>
            Delete
          </button>
        </>
      ) : null}
      <ul>
        {organizeRoutine(routine).map(exercise => (
          <li key={exercise.id}>
            <h4>{`${exercise.lift}: ${exercise.printout}`}</h4>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Workout;
