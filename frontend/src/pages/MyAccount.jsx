import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { useGlobalContext } from 'hooks';
import urls from 'urls';
import ThemedWindow from 'components/ThemedWindow';
import Spacer from 'components/Spacer';

import disconnected from 'assets/screenshots/disconnected.png';
import connected from 'assets/screenshots/connected.png';
import tokenInput from 'assets/screenshots/token-input.png';

const MyAccount = () => {
  const { isAuthenticated, loading, userInfo } = useGlobalContext();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect to={urls.login} />;
  }

  return (
    <>
      <Typography variant="h5" align="center">
        Your User Information
      </Typography>

      <Spacer v={8} />

      <ThemedWindow>
        <Grid container direction="row" justify="space-between">
          <Grid item sm={5} xs={12}>
            <Typography variant="subtitle1" paragraph>
              Your user token
            </Typography>

            <TextField variant="outlined" value={userInfo.token} fullWidth />
            <Spacer v={16} smUp />
          </Grid>

          <Grid item sm={5} xs={12}>
            <Typography variant="subtitle1" paragraph>
              Your tracker widget URL
            </Typography>

            <TextField
              variant="outlined"
              value={`${window.location.origin}/widget/${userInfo.id}/`}
              fullWidth
            />
          </Grid>
        </Grid>
      </ThemedWindow>

      <Spacer v={32} />

      <Typography variant="h5" align="center">
        How to use these?
      </Typography>

      <Spacer v={8} />

      <Grid container direction="column" alignItems="center" alignContent="center">
        <ThemedWindow>
          <Grid container direction="column" alignItems="center" alignContent="center">
            <Typography variant="subtitle1">
              1. <Link href="/downloads/tracker.zip">Click here</Link> to download the tracker
            </Typography>

            <Typography variant="subtitle1">2. Open it, and input your token from above</Typography>

            <Spacer v={16} />

            <img src={tokenInput} alt="Token input screen" />

            <Spacer v={16} />

            <Typography variant="subtitle1">
              3. Open Axiom Verge and click on the red dot in the tracker
            </Typography>

            <Spacer v={16} />

            <img src={disconnected} alt="Disconnected tracker" />

            <Spacer v={16} />

            <Typography variant="subtitle1">
              4. You should now see the tracker with a green dot.
            </Typography>

            <Spacer v={16} />

            <img src={connected} alt="Connected tracker" />

            <Spacer v={16} />

            <Typography variant="subtitle1">
              5. Add your widget URL as a browser source in OBS <br />
              (min-width 272px)
            </Typography>

            <Spacer v={16} />

            <Typography variant="subtitle1">6. Go get a PB!</Typography>
          </Grid>
        </ThemedWindow>
      </Grid>
    </>
  );
};

export default observer(MyAccount);
