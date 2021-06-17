import React, { useState, useEffect } from 'react';
import RecordList from './RecordList';
import WorkoutList from '../stats/WorkoutList';

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
  const [isWide, setIsWide] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 992
  );
  const updateMedia = () => {
    setIsWide(window.innerWidth >= 992);
  };
  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });
  return (
    <>
      {isWide ? (
        <>
          <section>
            <h1>Workouts</h1>
            <WorkoutList
              workouts={[...workouts].reverse()}
              updateWorkouts={updateWorkouts}
              selectWorkout={selectWorkout}
              editingWorkout={editingWorkout}
            />
          </section>
          <section>
            <h1>Records</h1>
            <RecordList records={[...records].reverse()} />
          </section>
        </>
      ) : (
        <section className='is-narrow'>
          <h1>{display === 'workouts' ? 'Workouts' : 'Records'}</h1>
          {display === 'records' ? (
            <RecordList records={[...records].reverse()} />
          ) : (
            <WorkoutList
              workouts={[...workouts].reverse()}
              updateWorkouts={updateWorkouts}
              selectWorkout={selectWorkout}
              editingWorkout={editingWorkout}
            />
          )}
          <fieldset>
            <label>
              <input
                className='radio'
                type='radio'
                value='workouts'
                checked={display === 'workouts'}
                onChange={handleChange}
              />
              Workouts
            </label>
            <label>
              <input
                className='radio'
                type='radio'
                value='records'
                checked={display === 'records'}
                onChange={handleChange}
              />
              Records
            </label>
          </fieldset>
        </section>
      )}
    </>
  );
};

export default StatsApp;
