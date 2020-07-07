import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './styles/App.css';
import About from './components/routes/About';
import Alerts from './components/layout/Alerts';
import Footer from './components/layout/Footer';
import Home from './components/routes/Home';
import Login from './components/routes/Login';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routes/PrivateRoute';
import Register from './components/routes/Register';
import Roster from './components/roster/Roster';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import ClientState from './context/client/ClientState';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      md: 750,
    },
  },
});

const App = () => {
  return (
    <div className='app'>
      <AuthState>
        <ClientState>
          <AlertState>
            <ThemeProvider theme={theme}>
              <Router>
                <Navbar />
                <Alerts />
                <Route
                  render={({ location }) => (
                    <TransitionGroup>
                      <CSSTransition
                        key={location.key}
                        classNames='slide'
                        timeout={350}
                      >
                        <Switch location={location}>
                          <PrivateRoute exact path='/' component={Home} />
                          <PrivateRoute
                            exact
                            path='/clients'
                            component={Roster}
                          />
                          <Route exact path='/about' component={About} />
                          <Route exact path='/login' component={Login} />
                          <Route exact path='/register' component={Register} />
                          <PrivateRoute path='/:id' component={Home} />
                        </Switch>
                      </CSSTransition>
                    </TransitionGroup>
                  )}
                />
                <Footer />
              </Router>
            </ThemeProvider>
          </AlertState>
        </ClientState>
      </AuthState>
    </div>
  );
};

export default App;
