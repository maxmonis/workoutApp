import React, { Fragment } from 'react';

import './styles/App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Alerts from './components/layout/Alerts';
import Login from './components/routes/Login';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routes/PrivateRoute';
import Register from './components/routes/Register';
import Router from './components/routes/Router';

import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import ClientState from './context/client/ClientState';

const App = () => {
  return (
    <div className='app'>
      <AuthState>
        <ClientState>
          <AlertState>
            <BrowserRouter>
              <Fragment>
                <Navbar />
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Router} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <PrivateRoute exact path='/:id' component={Router} />
                </Switch>
              </Fragment>
            </BrowserRouter>
          </AlertState>
        </ClientState>
      </AuthState>
    </div>
  );
};

export default App;
