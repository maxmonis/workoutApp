import React, { useState } from 'react';

import ClientApp from '../clientComponents/ClientApp';
import ClientList from '../clientComponents/ClientList';

import Paper from '@material-ui/core/Paper';

const HomeApp = () => {
  const [isDisplayingForm, setIsDisplayingForm] = useState(false);
  const handleDisplayForm = () => {
    setIsDisplayingForm(true);
  };
  const handleHideForm = () => {
    setIsDisplayingForm(false);
  };
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
      }}
    >
      <div>
        <ClientApp
          isDisplayingForm={isDisplayingForm}
          handleDisplayForm={handleDisplayForm}
          handleHideForm={handleHideForm}
        />
        <Paper style={{ width: '450px' }}>
          <ClientList handleDisplayForm={handleDisplayForm} />
        </Paper>
      </div>
    </div>
  );
};

export default HomeApp;
