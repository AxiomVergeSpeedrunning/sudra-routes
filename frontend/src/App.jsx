import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

import Nav from 'components/Nav';

import Home from 'pages/Home';
import Dictionary from 'pages/Dictionary';
import Login from 'pages/Login';
import Register from 'pages/Register';
import TrackerWidget from 'pages/TrackerWidget';
import MyAccount from 'pages/MyAccount';

import GlobalContextProvider from 'components/GlobalContextProvider';
import urls from './urls';

const theme = createMuiTheme({
  palette: {
    // TODO: add a toggle for this somewhere on the site, and keep it in context
    type: 'dark',
    primary: {
      main: red[800],
      light: red[700],
      dark: red[900],
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const App = () => (
  <SnackbarProvider maxSnack={3}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <GlobalContextProvider>
          <Nav>
            <Switch>
              <Route exact path={urls.home} component={Home} />
              <Route exact path={urls.dictionary} component={Dictionary} />
              <Route exact path={urls.login} component={Login} />
              <Route exact path={urls.register} component={Register} />
              <Route exact path={urls.account} component={MyAccount} />
              <Route exact path="/widget/:uid/" component={TrackerWidget} />
            </Switch>
          </Nav>
        </GlobalContextProvider>
      </Router>
    </ThemeProvider>
  </SnackbarProvider>
);

export default observer(App);
