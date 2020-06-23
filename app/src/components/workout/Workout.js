import React, { useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import organizeRoutine from '../../functions/organizeRoutine';
import useToggle from '../../hooks/useToggle';

const Workout = ({
  workout,
  selected,
  flagged,
  handleClick,
  handleSelect,
  handleDelete,
}) => {
  const { id, fullDate, name, routine } = workout;
  const [displayMessage, toggle] = useToggle(false);
  useEffect(() => {
    const timer = setTimeout(() => displayMessage && toggle(), 2000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [displayMessage]);
  return (
    <div>
      <button className='button' value={id} onClick={handleClick}>
        {fullDate.slice(0, -3)}
        <br />
        {selected === '#' && name}
      </button>
      <div>
        {flagged === id && (
          <div>
            <div className='flex-row'>
              <IconButton
                color='inherit'
                onClick={toggle}
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
                <DeleteIcon onDoubleClick={handleDelete} />
                <br />
                to delete workout
              </h5>
            )}
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
      <Divider />
    </div>
  );
};

export default Workout;
