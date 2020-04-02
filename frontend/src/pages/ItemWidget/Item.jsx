import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import { tools, weapons, collectables } from './itemDict';

const all = { ...tools, ...weapons, ...collectables };

const useStyles = makeStyles(() => ({
  // Used to modify other classes
  complete: {},

  root: {
    width: 48,
    height: 48,
  },
  img: {
    filter: 'brightness(30%)',
    height: '100%',
    width: '100%',
    '&$complete': {
      filter: 'none',
    },
  },
}));

const Item = ({ name, complete, className: externClassName }) => {
  const classes = useStyles();

  const className = classNames(classes.root, externClassName);
  const imgClassName = classNames(classes.img, { [classes.complete]: complete });

  const Image = all[name];

  return (
    <div className={className}>
      <img className={imgClassName} src={Image} alt="" />
    </div>
  );
};

Item.propTypes = {
  name: PropTypes.oneOf(Object.keys(all)).isRequired,
  complete: PropTypes.bool,
  className: PropTypes.string,
};

Item.defaultProps = {
  complete: false,
  className: '',
};

export default Item;
