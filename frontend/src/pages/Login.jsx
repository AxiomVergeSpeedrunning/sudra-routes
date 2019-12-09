import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Cookies from 'js-cookie';

import Spacer from 'components/Spacer';
import ThemedWindow from 'components/ThemedWindow';
import api from 'api';
import urls from 'urls';
import { useGlobalContext } from 'hooks';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, checkAuthentication } = useGlobalContext();
  const history = useHistory();

  const classes = useStyles();

  if (isAuthenticated) {
    return <Redirect to={urls.home} />;
  }

  const submit = async e => {
    e.preventDefault();

    try {
      const { token } = await api.login({ username, password });
      Cookies.set('authToken', token, { expires: 14 });
      await checkAuthentication();
      history.push(urls.home);
    } catch (err) {
      enqueueSnackbar('Error logging in. Please check your username and password.', {
        variant: 'error',
      });
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      alignItems="center"
      direction="column"
      className={classes.root}
    >
      <ThemedWindow>
        <form onSubmit={submit}>
          <Grid container direction="column">
            <TextField
              value={username}
              onChange={e => setUsername(e.target.value)}
              label="Username"
              placeholder="axiomvergelover1337"
              variant="outlined"
              autoFocus
            />

            <Spacer v={16} />

            <TextField
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              label="Password"
              variant="outlined"
            />

            <Spacer v={16} />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              onClick={submit}
            >
              Login
            </Button>

            <Spacer v={8} />

            <Button variant="text" fullWidth onClick={() => history.push(urls.register)}>
              Don't have an account?
            </Button>
          </Grid>
        </form>
      </ThemedWindow>
    </Grid>
  );
};

export default observer(Login);
