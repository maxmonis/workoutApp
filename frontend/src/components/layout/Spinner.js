import React, { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import '../../styles/Spinner.css';

const Spinner = ({ duration }) => {
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  useEffect(() => {
    if (duration) {
      setTimeout(() => {
        setIsTimedOut(true);
        setTimeout(() => {
          setIsRedirecting(true);
        }, 2000);
      }, duration);
    }
    // eslint-disable-next-line
  }, []);
  return isRedirecting ? (
    <Redirect to='/' />
  ) : isTimedOut ? (
    <h1>Request timed out</h1>
  ) : (
    <div className='spinner' />
  );
};

export default Spinner;
