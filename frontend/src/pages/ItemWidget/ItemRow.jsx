import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Item from './Item';

const ItemRow = ({ items, itemInfo }) => (
  <Grid container direction="row">
    {Object.keys(items).map(name => (
      <Item name={name} key={name} complete={itemInfo[name]} />
    ))}
  </Grid>
);

ItemRow.propTypes = {
  items: PropTypes.object.isRequired,
  itemInfo: PropTypes.object.isRequired,
};

export default ItemRow;
