import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';

import AxiomBorder from '../assets/axiom-border.png';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    border: '10px solid transparent',
    borderImage: `url(${AxiomBorder}) 10 round`,
    borderRadius: 12,
    backgroundColor: '#130612',
  },
}));

const ThemedWindow = ({ children, className: externClassName }) => {
  const classes = useStyles();

  return <Paper className={classNames(classes.root, externClassName)}>{children}</Paper>;
};

ThemedWindow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ThemedWindow.defaultProps = {
  className: '',
};

export default ThemedWindow;
