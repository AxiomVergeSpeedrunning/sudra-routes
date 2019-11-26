import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    fontFamily: 'Joystix',
    fontSize: '12px',
    textTransform: 'uppercase',
  },
  label: {
    color: '#CD5C5C',
  },
  value: {
    color: '#FFFFFF',
  },
});

const Item = ({ label, value }) => {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <span className={classes.label}>{label}:</span>{' '}
      <span className={classes.calue}>{value === null ? 'null' : value}</span>
    </span>
  );
};

Item.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Item.defaultProps = {
  value: null,
};

export default Item;
