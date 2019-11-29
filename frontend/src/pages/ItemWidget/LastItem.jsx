import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ThemedWindow from 'components/ThemedWindow';
import Item from './Item';

const LastItem = ({ name }) => (
  <ThemedWindow variant="red" slim>
    <Grid container direction="column" alignItems="center">
      <Typography variant="subtitle2" paragraphy>
        Last
      </Typography>

      <Item name={name} complete />
    </Grid>
  </ThemedWindow>
);

LastItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default LastItem;
