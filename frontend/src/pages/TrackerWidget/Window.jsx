import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import ThemedWindow from 'components/ThemedWindow';

const useStyles = makeStyles({
  root: {
    width: 272,
    padding: [[4, 8]],
    position: 'relative',
  },
  heading: {
    fontFamily: 'GoodTimes',
    fontSize: '16px',
    textAlign: 'center',
    display: 'block',
    color: '#F08080',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
});

const Window = ({ heading, children }) => {
  const classes = useStyles();

  return (
    <ThemedWindow className={classes.root}>
      <div className={classes.heading}>{heading}</div>
      {children}
    </ThemedWindow>
  );
};

Window.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Window.defaultProps = {
  children: null,
};

export default Window;
