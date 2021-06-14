import React from 'react';

const ExerciseHistory = ({ records, lift, setExercise }) => {
  const liftRecords = records.filter(record => record.lift === lift).reverse();
  return (
    <div className='exercise-history'>
      {!liftRecords.length ? (
        <h4>{lift} records will be displayed here</h4>
      ) : (
        <>
          {liftRecords.map(exercise => (
            <button
              className='btn'
              key={exercise.id}
              onClick={() => setExercise(exercise)}>
              {exercise.printout}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default ExerciseHistory;
