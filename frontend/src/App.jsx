import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Cookies from 'js-cookie';

import Nav from 'components/Nav';

import Home from 'pages/Home';
import Dictionary from 'pages/Dictionary';
import Login from 'pages/Login';
import Register from 'pages/Register';
import TrackerWidget from 'pages/TrackerWidget';
import ItemWidget from 'pages/ItemWidget';
import MyAccount from 'pages/MyAccount';

import Tutorials from 'pages/Tutorials';
import CreateTutorial from 'pages/Tutorials/Create';
import ViewTutorial from 'pages/Tutorials/View';
import EditTutorial from 'pages/Tutorials/Edit';

import Categories from 'pages/Categories';

import GlobalContextProvider from 'components/GlobalContextProvider';
import urls from './urls';

const goodTimes = { fontFamily: 'GoodTimes, Roboto, Helvetica, Arial, sans-serif' };
const joystix = { fontFamily: 'Joystix, Roboto, Helvetica, Arial, sans-serif' };

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
    h1: {
      ...goodTimes,
      fontSize: '4rem',
    },
    h2: { ...goodTimes, fontSize: '3rem' },
    h3: { ...goodTimes, fontSize: '2rem' },
    h4: joystix,
    h5: joystix,
    h6: joystix,
    subtitle1: joystix,
    subtitle2: joystix,
  },
});

const apolloClient = new ApolloClient({
  uri: '/api/v1/graphql/',
  request: operation => {
    const authToken = Cookies.get('authToken');
    operation.setContext({ headers: { Authorization: authToken ? `Token ${authToken}` : '' } });
  },
});

const App = () => (
  <ApolloProvider client={apolloClient}>
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

                <Route exact path={urls.categories.root} component={Categories} />

                <Route exact path={urls.tutorials.root} component={Tutorials} />
                <Route exact path={urls.tutorials.create} component={CreateTutorial} />
                <Route exact path={`${urls.tutorials.view}:id/`} component={ViewTutorial} />
                <Route exact path={`${urls.tutorials.edit}:id/`} component={EditTutorial} />

                <Route exact path="/widget/:uid/" component={TrackerWidget} />
                <Route exact path="/items/:uid/" component={ItemWidget} />
              </Switch>
            </Nav>
          </GlobalContextProvider>
        </Router>
      </ThemeProvider>
    </SnackbarProvider>
  </ApolloProvider>
);

export default observer(App);
