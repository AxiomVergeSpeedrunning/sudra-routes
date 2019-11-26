import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 18,
    height: 18,
    position: 'absolute',
    top: 6,
  },
});

const Dot = ({ right, img }) => {
  const classes = useStyles();

  return <img className={classes.root} src={img} style={{ right: right * 24 + 4 }} alt="" />;
};

Dot.propTypes = {
  right: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
};

export default Dot;
