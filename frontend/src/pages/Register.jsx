import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Cookies from 'js-cookie';
import { validate as isemail } from 'isemail';

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

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, checkAuthentication, logout } = useGlobalContext();
  const history = useHistory();

  const classes = useStyles();

  if (isAuthenticated) {
    return <Redirect to={urls.home} />;
  }

  const submit = async e => {
    e.preventDefault();
    logout();

    if (password !== passwordConfirmation || !isemail(email)) {
      return;
    }

    try {
      const { token } = await api.register({ username, email, password });
      Cookies.set('authToken', token);
      checkAuthentication();
      history.push(urls.home);
    } catch (err) {
      enqueueSnackbar('Error signing up - that user might already exist.', {
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              label="Email Address"
              type="email"
              placeholder="axiomvergelover1337@gmail.com"
              variant="outlined"
              error={Boolean(email) && !isemail(email)}
              helperText={email && !isemail ? 'Please enter a valid email' : ''}
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

            <TextField
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
              type="password"
              label="Confirm Password"
              variant="outlined"
              error={password !== passwordConfirmation}
              helperText={password !== passwordConfirmation ? 'Passwords do not match' : ''}
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
              Register
            </Button>

            <Spacer v={8} />

            <Button variant="text" fullWidth onClick={() => history.push(urls.login)}>
              Already have an account?
            </Button>
          </Grid>
        </form>
      </ThemedWindow>
    </Grid>
  );
};

export default observer(Register);
