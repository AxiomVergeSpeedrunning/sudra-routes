import React, { useState, useEffect } from 'react';
import TwitchEmbed from 'react-twitch-embed-video';
import Grid from '@material-ui/core/Grid';

import helix from '../twitch-api';

const FirstLiveStream = () => {
  const [loaded, setLoaded] = useState(false);
  const [channel, setChannel] = useState('');

  useEffect(() => {
    helix.get('streams', { params: { game_id: '34072' } }).then(({ data }) => {
      if (!data.length) {
        return;
      }

      setChannel(data[0].user_name);
    });

    setLoaded(true);
  }, []);

  if (!loaded || !channel) {
    return null;
  }

  return (
    <Grid container justify="center">
      <TwitchEmbed channel={channel} layout="video" theme="dark" />
    </Grid>
  );
};

export default FirstLiveStream;
