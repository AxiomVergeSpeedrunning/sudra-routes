import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';

import NormalBorder from '../assets/axiom-border.png';
import PurpleBorder from '../assets/purple-border.png';
import DeepRedBorder from '../assets/deep-red-border.png';
import PinkBorder from '../assets/pink-border.png';

const useStyles = makeStyles(theme => ({
  purple: {
    borderImageSource: `url(${PurpleBorder})`,
    backgroundColor: '#000000',
  },
  deepRed: {
    borderImageSource: `url(${DeepRedBorder})`,
  },
  pink: {
    borderImageSource: `url(${PinkBorder})`,
  },

  root: {
    padding: theme.spacing(3),
    border: '10px solid transparent',
    borderImage: `url(${NormalBorder}) 10 round`,
    borderRadius: 12,
    backgroundColor: '#130612',
  },
}));

const ThemedWindow = ({ children, variant, className: externClassName }) => {
  const classes = useStyles();
  const className = classNames(
    classes.root,
    {
      [classes.purple]: variant === 'purple',
      [classes.deepRed]: variant === 'red',
      [classes.pink]: variant === 'pink',
    },
    externClassName,
  );

  return <Paper className={className}>{children}</Paper>;
};

ThemedWindow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'red', 'purple', 'pink']),
};

ThemedWindow.defaultProps = {
  className: '',
  variant: 'default',
};

export default ThemedWindow;
