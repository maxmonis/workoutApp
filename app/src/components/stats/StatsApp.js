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
            <h2>Workouts</h2>
            <WorkoutList
              workouts={[...workouts].reverse()}
              updateWorkouts={updateWorkouts}
              selectWorkout={selectWorkout}
              editingWorkout={editingWorkout}
            />
          </section>
          <section>
            <h2>Records</h2>
            <RecordList records={[...records].reverse()} />
          </section>
        </>
      ) : (
        <section>
          <h2>
            <span
              className={
                display === 'workouts' ? 'pointer underline' : 'pointer'
              }
              onClick={() => setDisplay('workouts')}>
              Workouts
            </span>
            &nbsp;|&nbsp;
            <span
              className={
                display === 'records' ? 'pointer underline' : 'pointer'
              }
              onClick={() => setDisplay('records')}>
              Records
            </span>
          </h2>
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
        </section>
      )}
    </>
  );
};

export default StatsApp;
