import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import urls from 'urls';
import BasePreview from 'components/Preview';

const Preview = ({ tutorial }) => (
  <BasePreview
    href={`${urls.tutorials.view}${tutorial.id}/`}
    title={tutorial.title}
    subtitle={tutorial.author.username}
  />
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
