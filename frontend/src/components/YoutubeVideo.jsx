import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import YoutubeEmbedVideo from 'youtube-embed-video';

const YoutubeVideo = ({ id }) => <YoutubeEmbedVideo videoId={id} enhancedPrivacy />;

YoutubeVideo.propTypes = {
  id: PropTypes.string.isRequired,
};

export default observer(YoutubeVideo);
