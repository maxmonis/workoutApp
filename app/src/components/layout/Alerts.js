import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);
  return (
    <TransitionGroup>
      {alerts.length > 0 &&
        alerts.map(alert => (
          <CSSTransition classNames='slide-up' key={alert.id} timeout={200}>
            <h4 className={`alert ${alert.type || ''}`}>
              {alert.msg}
            </h4>
          </CSSTransition>
        ))}
    </TransitionGroup>
  );
};

export default Alerts;
