import React from 'react';

import ClientFilter from './ClientFilter';
import ClientForm from './ClientForm';
import { Button } from '@material-ui/core';

const ClientApp = ({ isDisplayingForm, handleDisplayForm, handleHideForm }) => {
  return (
    <div>
      {isDisplayingForm ? (
        <ClientForm
          handleHideForm={handleHideForm}
        />
      ) : (
        <Button onClick={handleDisplayForm}>Add New Client</Button>
      )}
      <ClientFilter />
    </div>
  );
};

export default ClientApp;
