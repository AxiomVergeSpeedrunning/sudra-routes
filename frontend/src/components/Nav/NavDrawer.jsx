import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Hidden from '@material-ui/core/Hidden';

import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TrafficIcon from '@material-ui/icons/Traffic';
import GamepadIcon from '@material-ui/icons/Gamepad';
import BookIcon from '@material-ui/icons/Book';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import urls from 'urls';

import { useGlobalContext } from 'hooks';

const list = [
  [HomeIcon, urls.home, 'Home'],
  [MenuBookIcon, urls.tutorials, 'Tutorials'],
  [ExitToAppIcon, urls.routes, 'Routes'],
  [BookIcon, urls.dictionary, 'Dictionary'],
  [TrafficIcon, urls.race, 'Race'],
  [GamepadIcon, urls.streams, 'Streams'],
];

const NavDrawer = ({ classes, ...props }) => {
  const history = useHistory();
  const goTo = url => () => history.push(url);
  const { isAuthenticated, logout } = useGlobalContext();

  return (
    <Drawer {...props} className={classes.drawer}>
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

        <Divider />

        <List>
          {!isAuthenticated ? (
            <>
              <ListItem button onClick={goTo(urls.login)}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>

                <ListItemText primary="Log in" />
              </ListItem>

              <ListItem button onClick={goTo(urls.register)}>
                <ListItemIcon>
                  <NoteAddIcon />
                </ListItemIcon>

                <ListItemText primary="Register" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={goTo(urls.account)}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>

                <ListItemText primary="My Account" />
              </ListItem>

              <ListItem button onClick={logout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>

                <ListItemText primary="Log out" />
              </ListItem>
            </>
          )}
        </List>
      </div>
    </Drawer>
  );
};

NavDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default observer(NavDrawer);
