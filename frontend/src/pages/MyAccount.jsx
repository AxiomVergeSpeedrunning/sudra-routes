import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { useGlobalContext } from 'hooks';
import urls from 'urls';
import ThemedWindow from 'components/ThemedWindow';
import Spacer from 'components/Spacer';

const MyAccount = () => {
  const { isAuthenticated, loading, userInfo } = useGlobalContext();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect to={urls.login} />;
  }

  return (
    <>
      <ThemedWindow>
        <Grid container direction="row" justify="space-between">
          <Grid item sm={5} xs={12}>
            <Typography variant="subtitle1" style={{ fontFamily: 'Joystix' }} paragraph>
              Your user token
            </Typography>

            <TextField variant="outlined" value={userInfo.token} />
            <Spacer v={16} smUp />
          </Grid>

          <Grid item sm={5} xs={12}>
            <Typography variant="subtitle1" style={{ fontFamily: 'Joystix' }} paragraph>
              Your tracker widget URL
            </Typography>

            <TextField variant="outlined" value={`${location.origin}/widget/${userInfo.id}/`} />
          </Grid>
        </Grid>
      </ThemedWindow>
    </>
  );
};

export default observer(MyAccount);
