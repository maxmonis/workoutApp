import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Alerts from './components/layout/Alerts';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/pages/PrivateRoute';
import Register from './components/pages/Register';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import ClientState from './context/client/ClientState';
import WorkoutState from './context/workout/WorkoutState';
import useToggle from './hooks/useToggle';

const App = () => {
  const [dark, toggleDark] = useToggle(true);
  return (
    <div className={`app ${dark ? 'dark' : ''}`}>
      <AuthState>
        <ClientState>
          <WorkoutState>
            <AlertState>
              <Router>
                <Navbar dark={dark} toggleDark={toggleDark} />
                <Route
                  render={({ location }) => (
                    <TransitionGroup>
                      <CSSTransition
                        key={location.key}
                        classNames='slide'
                        timeout={350}>
                        <Switch location={location}>
                          <Route exact path='/login' component={Login} />
                          <Route exact path='/register' component={Register} />
                          <PrivateRoute exact path='/' component={Home} />
                          <PrivateRoute path='/:id' component={Home} />
                        </Switch>
                      </CSSTransition>
                    </TransitionGroup>
                  )}
                />
                <Footer />
              </Router>
              <Alerts />
            </AlertState>
          </WorkoutState>
        </ClientState>
      </AuthState>
    </div>
  );
};

export default App;
