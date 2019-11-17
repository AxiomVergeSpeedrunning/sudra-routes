import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TrafficIcon from '@material-ui/icons/Traffic';
import GamepadIcon from '@material-ui/icons/Gamepad';
import Typography from '@material-ui/core/Typography';

import urls from '../urls';

const useStyles = makeStyles({
  list: {
    minWidth: 250,
  },
  title: {
    flexGrow: 1,
    marginLeft: 16,
  },
});

const list = [
  [HomeIcon, urls.home, 'Home'],
  [MenuBookIcon, urls.tutorials, 'Tutorials'],
  [ExitToAppIcon, urls.routes, 'Routes'],
  [TrafficIcon, urls.race, 'Race'],
  [GamepadIcon, urls.streams, 'Streams'],
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const goTo = url => () => history.push(url);

  // Close the navbar whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(v => !v)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Axiom Verge Speedrunning
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={() => setOpen(false)}>
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
    </>
  );
};

export default Nav;
