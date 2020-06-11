import React, { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import '../../styles/Spinner.css';

const Spinner = ({ duration = 10000 }) => {
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsTimedOut(true);
      handleRedirect();
    }, duration);
    // eslint-disable-next-line
  }, []);
  const handleRedirect = () => {
    setTimeout(() => {
      setIsRedirecting(true);
    }, 3000);
  };
  return isRedirecting ? (
    <Redirect to='/' />
  ) : isTimedOut ? (
    <h1>Request timed out</h1>
  ) : (
    <div>
      <div className='spinner' />
      <h1>Loading...</h1>
    </div>
  );
};

export default Spinner;
