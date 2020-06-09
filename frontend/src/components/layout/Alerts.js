import React, { useContext } from 'react';

import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    alerts.length > 0 &&
    alerts.map((alert) => <h4 key={alert.id}>{alert.msg}</h4>)
  );
};

export default Alerts;
