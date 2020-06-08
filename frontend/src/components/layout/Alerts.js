import React, { useContext } from 'react';
import './layout.css';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <h1 className='alert' key={alert.id}>
        {alert.msg}
      </h1>
    ))
  );
};

export default Alerts;
