import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';

import { useGlobalContext } from 'hooks';

import NavDrawer from './NavDrawer';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: '1',
  },
  list: {
    minWidth: drawerWidth,
  },
  menu: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'GoodTimes',
  },
  toolbar: theme.mixins.toolbar,
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    position: 'relative',
    flexGrow: 1,
    padding: [[theme.spacing(4), theme.spacing(4)]],
  },
}));

const Nav = ({ children }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const onDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const store = useGlobalContext();

  // Close the navbar whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  if (!store.useNav) {
    return children;
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Hidden lgUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className={classes.menu}
              onClick={() => setOpen(v => !v)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Typography variant="h6" className={classes.title}>
            Axiom Verge Speedrunning
          </Typography>
        </Toolbar>
      </AppBar>

      <NavDrawer
        open={open || onDesktop}
        variant={onDesktop ? 'persistent' : 'temporary'}
        onClose={() => setOpen(false)}
        classes={classes}
      />

      <Container className={classes.content} maxWidth="md">
        <div className={classes.toolbar} />
        {children}
      </Container>
    </div>
  );
};

Nav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default observer(Nav);
