import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import CssBaseline from '@material-ui/core/CssBaseline';
import urls from './urls';

import Nav from './components/Nav';

import Home from './pages/Home';

const theme = createMuiTheme({
  palette: {
    // TODO: add a toggle for this somewhere on the site, and keep it in context
    type: 'dark',
    primary: {
      main: grey[800],
      light: grey[700],
      dark: grey[900],
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <Router>
      <Nav>
        <Switch>
          <Route exact path={urls.home} component={Home} />
        </Switch>
      </Nav>
    </Router>
  </ThemeProvider>
);

export default App;
