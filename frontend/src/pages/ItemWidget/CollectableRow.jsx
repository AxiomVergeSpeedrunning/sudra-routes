import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const CollectableRow = ({ children }) => (
  <Grid container direction="row" wrap="nowrap" justify="space-between">
    {children}
  </Grid>
);

CollectableRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CollectableRow;
