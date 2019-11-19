import React, { useState, useEffect } from 'react';
import TwitchEmbed from 'react-twitch-embed-video';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

import helix from '../twitch-api';

const FirstLiveStream = () => {
  const [loaded, setLoaded] = useState(false);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    helix.get('streams', { params: { game_id: '34072' } }).then(({ data }) => {
      if (!data.length) {
        return;
      }

      setChannel(_.sample(data));
    });

    setLoaded(true);
  }, []);

  if (!loaded || !channel) {
    return null;
  }

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <TwitchEmbed channel={channel.user_name} layout="video" theme="dark" />
        <Typography variant="caption">Now live: {channel.user_name}</Typography>
      </Grid>
    </>
  );
};

export default FirstLiveStream;
