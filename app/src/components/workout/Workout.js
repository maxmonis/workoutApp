import React, { useContext } from 'react';
import organizeRoutine from '../../functions/organizeRoutine';
import useToggle from '../../hooks/useToggle';
import AlertContext from '../../context/alert/alertContext';
import { formatDate } from '../../functions/helpers';
import { Modal } from '../layout/UI';

const Workout = ({
  workout,
  selected,
  editingWorkout,
  selectWorkout,
  updateWorkouts,
}) => {
  const { setAlert } = useContext(AlertContext);
  const { id, date, name, routine } = workout;
  const [showMenu, toggleMenu] = useToggle(false);
  const [showDeleteModal, toggleDeleteModal] = useToggle(false);
  const handleDelete = () => {
    updateWorkouts(id);
    setAlert('Workout Deleted', 'success');
  };
  return (
    <>
      {showDeleteModal && (
        <Modal class='delete-workout-modal' handleClose={toggleDeleteModal}>
          <div className='delete-workout-modal'>
            <h2>Delete Workout?</h2>
            <h5>This action cannot be undone</h5>
            <button onClick={handleDelete} className='btn red'>
              Delete
            </button>
            <button onClick={toggleDeleteModal} className='btn'>
              Cancel
            </button>
          </div>
        </Modal>
      )}
      <h3 className='pointer' onClick={toggleMenu}>
        {selected === '#' && `${name} - `}
        {formatDate(date)}
      </h3>
      {editingWorkout && editingWorkout.id === id ? (
        <button onClick={() => selectWorkout(null)} className='btn red'>
          Discard Changes
        </button>
      ) : showMenu ? (
        <>
          <button onClick={() => selectWorkout(workout)} className='btn'>
            Edit
          </button>
          <button onClick={toggleDeleteModal} className='btn'>
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
