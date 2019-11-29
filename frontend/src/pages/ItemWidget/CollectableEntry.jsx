import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { collectables } from './itemDict';

const useStyles = makeStyles(() => ({
  // Used to modify other classes
  complete: {},

  x: {
    fontFamily: 'Joystix',
    fontSize: 10,
    marginRight: 2,
  },

  label: {
    fontFamily: 'Joystix',
    fontSize: 18,

    '&$complete': {
      color: '#CD5C5C',
    },
  },

  img: {
    width: 40,
    height: 40,
  },
}));

const CollectableEntry = ({ name, number, total }) => {
  const classes = useStyles();

  const labelClass = classNames(classes.label, {
    [classes.complete]: number === total,
  });

  return (
    <Grid container direction="row" wrap="nowrap" alignItems="center">
      <img className={classes.img} src={collectables[name]} alt="" />

      <span className={labelClass}>
        <span className={classes.x}>x</span>
        {number}
      </span>
    </Grid>
  );
};

CollectableEntry.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number,
  total: PropTypes.number.isRequired,
};

CollectableEntry.defaultProps = {
  number: 0,
};

export default CollectableEntry;
