import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    // TODO: add a toggle for this somewhere on the site, and keep it in context
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <Router>
      <Switch>{/* TODO: actually add routes */}</Switch>
    </Router>
  </ThemeProvider>
);

export default App;
