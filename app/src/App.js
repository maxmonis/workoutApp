import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './styles/App.css';
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
                <Fragment>
                  <Navbar />
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path='/' component={Roster} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <PrivateRoute path='/:id' component={Home} />
                  </Switch>
                </Fragment>
              </Router>
            </ThemeProvider>
          </AlertState>
        </ClientState>
      </AuthState>
      <Footer />
    </div>
  );
};

export default App;
