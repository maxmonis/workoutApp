import React from 'react';
import Records from './Records';
import Workouts from '../workout/Workouts';

const StatsApp = ({ workouts, records }) => {
  return (
    <div>
      <Workouts workouts={workouts} />
      <Records records={records} />
    </div>
  );
};

export default StatsApp;
