import React, { useContext } from 'react';
import './layout.css';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <h3 className='alert' key={alert.id}>
        {alert.msg}
      </h3>
    ))
  );
};

export default Alerts;
