import React, { Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import About from './components/pages/About';
import Alerts from './components/layout/Alerts';
import HomeApp from './components/pages/HomeApp';
import Login from './components/authComponents/Login';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';
import Register from './components/authComponents/Register';
import Workouts from './components/pages/Workouts';

import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import ClientState from './context/client/ClientState';

function App() {
  return (
    <AuthState>
      <ClientState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={HomeApp} />
                  <PrivateRoute exact path='/workouts' component={Workouts} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ClientState>
    </AuthState>
  );
}

export default App;
