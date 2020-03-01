import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import UrlSearchParams from '@ungap/url-search-params';

import API from 'api';
import urls from 'urls';

const DiscordAuth = () => {
  const [done, setDone] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const submitToken = async () => {
      const fragment = new UrlSearchParams(location.hash.slice(1));

      try {
        await API.discordAuth({ token: fragment.get('access_token') });
      } finally {
        setDone(true);
      }
    };

    submitToken();
  }, []);

  if (!done) {
    return null;
  }

  return <Redirect to={urls.home} />;
};

export default observer(DiscordAuth);
