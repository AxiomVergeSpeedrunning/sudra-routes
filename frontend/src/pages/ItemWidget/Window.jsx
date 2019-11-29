import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import ThemedWindow from 'components/ThemedWindow';

const Window = ({ children }) => (
  <ThemedWindow variant="purple">
    <Grid container direction="row" justify="space-between" wrap="nowrap">
      {children}
    </Grid>
  </ThemedWindow>
);

Window.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Window;
