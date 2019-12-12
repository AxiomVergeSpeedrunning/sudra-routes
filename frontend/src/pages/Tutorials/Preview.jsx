import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';

import ThemedWindow from 'components/ThemedWindow';
import Spacer from 'components/Spacer';
import Link from 'components/Link';
import urls from 'urls';

const Preview = ({ tutorial }) => (
  <ThemedWindow variant="purple">
    <Link to={`${urls.tutorials.view}${tutorial.id}/`} color="secondary">
      <Typography variant="h5">{tutorial.title}</Typography>
    </Link>

    <Spacer v={8} />

    <Typography align="right" variant="subtitle2">
      by {tutorial.author.username}
    </Typography>
  </ThemedWindow>
);

Preview.propTypes = {
  tutorial: PropTypes.shape({
    id: PropTypes.any,
    title: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

export default observer(Preview);
