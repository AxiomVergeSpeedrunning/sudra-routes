import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';

import ThemedWindow from 'components/ThemedWindow';
import Spacer from 'components/Spacer';
import Link from 'components/Link';

const Preview = ({ href, title, subtitle, titleVariant, subtitleVariant }) => (
  <ThemedWindow variant="purple">
    <Link to={href} color="secondary">
      <Typography variant={titleVariant}>{title}</Typography>
    </Link>

    {subtitle && (
      <>
        <Spacer v={8} />

        <Typography align="right" variant={subtitleVariant}>
          {subtitle}
        </Typography>
      </>
    )}
  </ThemedWindow>
);

Preview.propTypes = {
  href: PropTypes.string.isRequired,

  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,

  titleVariant: PropTypes.string,
  subtitleVariant: PropTypes.string,
};

Preview.defaultProps = {
  subtitle: '',
  titleVariant: 'h5',
  subtitleVariant: 'subtitle2',
};

export default observer(Preview);
