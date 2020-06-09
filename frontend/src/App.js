import React, { Fragment } from 'react';

import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/auth/PrivateRoute';
import Register from './components/auth/Register';

import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import ClientState from './context/client/ClientState';

const App = () => {
  return (
    <div className='app'>
      <AuthState>
        <ClientState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                </Switch>
              </Fragment>
            </Router>
          </AlertState>
        </ClientState>
      </AuthState>
    </div>
  );
};

export default App;
