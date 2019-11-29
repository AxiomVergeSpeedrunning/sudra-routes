import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import { tools, weapons, collectables } from './itemDict';

const all = { ...tools, ...weapons, ...collectables };

const useStyles = makeStyles(() => ({
  complete: {
    opacity: '100%',
  },

  root: {
    opacity: '50%',
    maxWidth: 32,
    maxHeight: 32,
  },
  img: {
    height: '100%',
    width: '100%',
  },
}));

const Item = ({ name, complete, className: externClassName }) => {
  const classes = useStyles();

  const className = classNames(
    classes.root,
    {
      [classes.complete]: complete,
    },
    externClassName,
  );

  const Image = all[name];

  return (
    <div className={className}>
      <Image className={classes.img} />
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
