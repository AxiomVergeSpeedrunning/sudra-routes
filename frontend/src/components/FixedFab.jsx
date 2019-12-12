import React from 'react';
import { observer } from 'mobx-react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: theme.zIndex.speedDial,
  },
}));

const FixedFab = props => {
  const classes = useStyles();

  return <Fab className={classes.root} {...props} />;
};

export default observer(FixedFab);
