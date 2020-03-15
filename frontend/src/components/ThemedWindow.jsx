import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import UrlSearchParams from '@ungap/url-search-params';

import NormalBorder from '../assets/axiom-border.png';
import PurpleBorder from '../assets/purple-border.png';
import DeepRedBorder from '../assets/deep-red-border.png';
import PinkBorder from '../assets/pink-border.png';

import GDQBorder from '../assets/gamer-tags-border.png';
import GDQSubBorder from '../assets/gdq-frame.png';

import GDQBorder2 from '../assets/gamer-tags-border-3.png';
import GDQSubBorder2 from '../assets/gdq-frame2.png';

import GDQBorder3 from '../assets/gamer-tags-border-4.png';
import GDQSubBorder3 from '../assets/gdq-frame3.png';

import AVSRBorder from '../assets/gamer-tags-border-2.png';
import AVSRSubBorder from '../assets/avsr-frame.png';

const useStyles = makeStyles({
  gameWindow: {
    backgroundColor: 'none',
  },
});

const useStyles = makeStyles(theme => ({
  // Used to modify other classes
  purple: {},
  deepRed: {},
  pink: {},
  slim: {},
  gdq: {},
  gdq2: {},
  gdq3: {},
  avsr: {},

  root: {
    padding: theme.spacing(3),
    border: '10px solid transparent',
    borderImage: `url(${NormalBorder}) 10 round`,
    borderRadius: 12,
    backgroundColor: '#130612',

    '&$gdq': {
      borderImage: `url(${GDQSubBorder}) 2 round`,
      border: '2px solid transparent',
      backgroundColor: '#021111',
    },

    '&$gdq2': {
      borderImage: `url(${GDQSubBorder2}) 2 round`,
      border: '2px solid transparent',
      backgroundColor: '#021111',
    },

    '&$gdq3': {
      borderImage: `url(${GDQSubBorder3}) 2 round`,
      border: '2px solid transparent',
      backgroundColor: '#021111',
    },

    '&$avsr': {
      borderImage: `url(${AVSRSubBorder}) 2 round`,
      border: '2px solid transparent',
      backgroundColor: '#110209',
    },

    '&$purple': {
      borderImageSource: `url(${PurpleBorder})`,
      backgroundColor: '#000000',

      '&$gdq': {
        borderImage: `url(${GDQBorder}) 9 round`,
        border: '9px solid transparent',
      },
      '&$gdq2': {
        borderImage: `url(${GDQBorder2}) 9 round`,
        border: '9px solid transparent',
      },
      '&$gdq3': {
        borderImage: `url(${GDQBorder3}) 9 round`,
        border: '9px solid transparent',
      },
      '&$avsr': {
        borderImage: `url(${AVSRBorder}) 9 round`,
        border: '9px solid transparent',
      },
    },

    '&$deepRed': {
      borderImageSource: `url(${DeepRedBorder})`,

      '&$gdq': {
        borderImage: `url(${GDQSubBorder}) 2 round`,
      },
      '&$gdq2': {
        borderImage: `url(${GDQSubBorder2}) 2 round`,
      },
      '&$gdq3': {
        borderImage: `url(${GDQSubBorder3}) 2 round`,
      },
      '&$avsr': {
        borderImage: `url(${AVSRSubBorder}) 2 round`,
      },
    },

    '&$pink': {
      borderImageSource: `url(${PinkBorder})`,
    },

    '&$slim': {
      padding: 4,
    },
  },
}));

const ThemedWindow = ({
  children,
  variant,
  subVariant,
  slim,
  className: externClassName,
  ...props
}) => {
  const location = useLocation();
  const search = new UrlSearchParams(location.search);

  const classes = useStyles();
  const className = classNames(
    classes.root,
    {
      [classes.purple]: variant === 'purple',
      [classes.deepRed]: variant === 'red',
      [classes.pink]: variant === 'pink',
      [classes.slim]: slim,
      [classes.gdq]: search.has('gdq') || subVariant === 'gdq',
      [classes.gdq2]: search.has('gdq2') || subVariant === 'gdq2',
      [classes.gdq3]: search.has('gdq3') || subVariant === 'gdq3',
      [classes.avsr]: search.has('avsr') || subVariant === 'avsr',
    },
    externClassName,
  );

  return (
    <Paper className={className} {...props}>
      {children}
    </Paper>
  );
};

ThemedWindow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'red', 'purple', 'pink']),
  subVariant: PropTypes.oneOf(['gdq', 'gdq2', 'gdq3', 'avsr']),
  slim: PropTypes.bool,
};

ThemedWindow.defaultProps = {
  className: '',
  variant: 'default',
  subVariant: '',
  slim: false,
};

export default ThemedWindow;
