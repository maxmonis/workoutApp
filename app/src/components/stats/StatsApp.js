import React, { useState } from 'react';
import RecordApp from './RecordApp';
import WorkoutList from '../workout/WorkoutList';

const StatsApp = ({
  workouts,
  records,
  updateWorkouts,
  selectWorkout,
  editingWorkout,
}) => {
  const [display, setDisplay] = useState('workouts');
  const handleChange = e => {
    const { value } = e.target;
    setDisplay(value);
  };
  return (
    <div>
      <h2>All {display === 'workouts' ? 'Workouts' : 'Records'}</h2>
      <div>
        {display === 'workouts' ? (
          <WorkoutList
            workouts={[...workouts].reverse()}
            updateWorkouts={updateWorkouts}
            selectWorkout={selectWorkout}
            editingWorkout={editingWorkout}
          />
        ) : (
          <RecordApp records={[...records].reverse()} />
        )}
      </div>
      <input
        className='radio'
        type='radio'
        value='workouts'
        id='workouts'
        checked={display === 'workouts'}
        onChange={handleChange}
      />
      <label htmlFor='workouts'>Workouts</label>
      <input
        className='radio'
        type='radio'
        value='records'
        id='records'
        checked={display === 'records'}
        onChange={handleChange}
      />
      <label htmlFor='records'>Records</label>
    </div>
  );
};

export default StatsApp;
