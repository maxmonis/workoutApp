import React, { useState, useEffect } from 'react';
import WorkoutApp from './WorkoutComponents/WorkoutApp';

const HomeApp = () => {
  const [drawerWidth, setDrawerWidth] = useState(240);
  useEffect(() => {
    setDrawerWidth(window.innerWidth * 0.5);
  }, []);
  return (
    <div>
      <WorkoutApp drawerWidth={drawerWidth} />
    </div>
  );
};

export default HomeApp;
