import React from 'react';

const ExerciseHistory = ({ records, lift, setExercise }) => {
  const liftRecords = records.filter(record => record.lift === lift).reverse();
  return (
    <div className='exercise-history'>
      {!liftRecords.length ? (
        <h6>{lift} records will be displayed here</h6>
      ) : (
        <div>
          {liftRecords.map(exercise => (
            <button
              className='btn'
              key={exercise.id}
              onClick={() => setExercise(exercise)}>
              {exercise.printout}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseHistory;
