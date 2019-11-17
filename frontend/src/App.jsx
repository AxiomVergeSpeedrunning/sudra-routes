import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';

import Nav from './components/Nav';

const theme = createMuiTheme({
  palette: {
    // TODO: add a toggle for this somewhere on the site, and keep it in context
    type: 'dark',
    primary: {
      main: red[800],
      light: red[600],
      dark: red[900],
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
        <Switch>{/* TODO: actually add routes */}</Switch>
      </Nav>
    </Router>
  </ThemeProvider>
);

export default App;
