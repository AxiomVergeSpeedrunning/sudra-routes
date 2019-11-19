import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';

import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TrafficIcon from '@material-ui/icons/Traffic';
import GamepadIcon from '@material-ui/icons/Gamepad';

import urls from '../urls';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  list: {
    minWidth: drawerWidth,
  },
  menu: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
    flexGrow: 1,
    padding: [[theme.spacing(4), theme.spacing(4)]],
  },
}));

const list = [
  [HomeIcon, urls.home, 'Home'],
  [MenuBookIcon, urls.tutorials, 'Tutorials'],
  [ExitToAppIcon, urls.routes, 'Routes'],
  [TrafficIcon, urls.race, 'Race'],
  [GamepadIcon, urls.streams, 'Streams'],
];

const Nav = ({ children }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const onDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const goTo = url => () => history.push(url);

  // Close the navbar whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

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

      <Drawer
        open={open || onDesktop}
        variant={onDesktop ? 'persistent' : 'temporary'}
        onClose={() => setOpen(false)}
        className={classes.drawer}
      >
        <Hidden mdDown>
          <div className={classes.toolbar} />
        </Hidden>
        <div className={classes.list}>
          <List>
            {list.map(([Icon, url, text]) => (
              <ListItem button onClick={goTo(url)} key={url}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>

                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      <Container className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </Container>
    </div>
  );
};

Nav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Nav;
