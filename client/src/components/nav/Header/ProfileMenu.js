import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Link } from '../../common';

const useStyles = makeStyles(theme => ({
  button: {
    fontWeight: 'bold',
    minWidth: 'auto'
  },
  popover: {
    backgroundColor: theme.palette.background.header,
    borderRadius: 12,
    marginTop: theme.spacing(1),
    padding: theme.spacing(0)
  },
  item: {
    color: theme.palette.common.white,
    fontSize: theme.typography.body1.fontSize,

    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main
    }
  }
}));

const ProfileMenu = ({ items, username }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const isOpen = Boolean(anchorEl);

  const id = isOpen ? 'logged-in-sub-menu' : undefined;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="primary" onClick={handleClick} className={classes.button}>
        {username ? username[0].toUpperCase() : 'U'}
      </Button>
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        classes={{ paper: classes.popover }}
      >
        <List>
          {items.map((item, i) => {
            if (item.onClick) {
              return (
                <ListItem
                  key={`profile-menu-item-${i}`}
                  button
                  onClick={item.onClick}
                  className={classes.item}
                >
                  <ListItemText>{item.label}</ListItemText>
                </ListItem>
              );
            }

            return (
              <ListItem
                key={`profile-menu-item-${i}`}
                button
                component={Link}
                to={item.link}
                className={classes.item}
              >
                <ListItemText>{item.label}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Popover>
    </>
  );
};

export default ProfileMenu;
