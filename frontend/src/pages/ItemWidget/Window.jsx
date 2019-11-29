import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import ThemedWindow from 'components/ThemedWindow';

const useStyles = makeStyles({
  window: {
    padding: 4,
  },
});

const Window = ({ children }) => {
  const classes = useStyles();

  return (
    <ThemedWindow variant="purple" className={classes.window}>
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
};

Window.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Window;
