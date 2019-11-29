import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import ThemedWindow from 'components/ThemedWindow';

const Window = ({ children }) => (
  <ThemedWindow variant="purple" slim>
    <Grid
      container
      direction="row"
      justify="space-between"
      wrap="nowrap"
      alignItems="center"
      alignContent="center"
    >
      {children}
    </Grid>
  </ThemedWindow>
);

Window.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Window;
