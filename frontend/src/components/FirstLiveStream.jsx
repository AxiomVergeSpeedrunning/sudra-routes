import React, { useState, useEffect } from 'react';
import TwitchEmbed from 'react-twitch-embed-video';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import _ from 'lodash';

import ThemedWindow from './ThemedWindow';
import helix from '../twitch-api';

const useStyles = makeStyles({
  img: {
    maxWidth: '100%',
    objectFit: 'contain',
  },
});

const FirstLiveStream = () => {
  const [loaded, setLoaded] = useState(false);
  const [channel, setChannel] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    helix.get('streams', { params: { game_id: '34072' } }).then(({ data }) => {
      if (!data.length) {
        return;
      }

      const randomChannel = _.sample(data);

      // Kill any useless sizing information
      randomChannel.thumbnail_url = randomChannel.thumbnail_url.replace('-{width}x{height}', '');

      setChannel(randomChannel);
    });

    setLoaded(true);
  }, []);

  if (!loaded || !channel) {
    return null;
  }

  return (
    <ThemedWindow>
      <Grid container justify="center" alignItems="center" direction="column">
        <Typography variant="subtitle1" paragraph>
          NOW LIVE:
          {channel.user_name}
        </Typography>

        <Hidden smDown>
          <TwitchEmbed channel={channel.user_name} layout="video" theme="dark" width="100%" />
        </Hidden>

        <Hidden mdUp>
          <Link href={`https://twitch.tv/${channel.user_name}`}>
            <img src={channel.thumbnail_url} alt="Watch now!" className={classes.img} />
          </Link>
        </Hidden>
      </Grid>
    </ThemedWindow>
  );
};

export default FirstLiveStream;
