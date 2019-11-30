import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ThemedWindow from 'components/ThemedWindow';
import Item from './Item';
import CollectableEntry from './CollectableEntry';

const LastItem = ({ itemInfo: { lastItem, noteCount } }) => (
  <ThemedWindow variant="red" slim>
    <Grid container direction="column" alignItems="center">
      <Typography variant="subtitle2" paragraphy>
        Last
      </Typography>

      <Item name={lastItem} complete />

      <CollectableEntry name="note" number={noteCount} total={28} />
    </Grid>
  </ThemedWindow>
);

LastItem.propTypes = {
  itemInfo: PropTypes.object.isRequired,
};

export default LastItem;
