import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import * as AuthService from '../../../services/auth';
import * as Actions from '../../../actions/user';
import { Links } from '../../../utils';
import { Link } from '../../common';
import NavLink from './NavLink';
import ProfileMenu from './ProfileMenu';

const useStyles = makeStyles(theme => ({
  header: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.header,
    display: 'grid',
    height: 72,
    left: 0,
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  nav: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 3)
  },
  logo: {
    color: theme.palette.common.white,
    fontSize: 22,
    fontWeight: 'bold',

    '&:hover': {
      color: theme.palette.common.white,
      textDecoration: 'none'
    }
  },
  navList: {
    alignItems: 'center',
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  navItem: {
    marginLeft: 40
  },
  badge: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    bottom: 5,
    height: 12,
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)',
    width: 12
  }
}));

const menu = [
  {
    label: 'Home',
    slug: Links.Public.home
  },

];

const Header = () => {
  const classes = useStyles();

  let dispatch = useDispatch();
  let { user } = useSelector(state => ({ ...state }));

  let history = useHistory();

  const logout = () => {
    AuthService.logout();
    dispatch(Actions.logout());
    history.push(Links.Public.home);
  };

  const renderNotLoggedInItems = () => {
    if (!user) {
      const items = [
      <>
        <Link to={Links.Auth.login} variant="button" color="primary">
          Login
        </Link>
        </>
      ];

      return items.map((item, i) => (
        <li key={`nav-not-logged-in-item-${i}`} className={classes.navItem}>
          {item}
        </li>
      ));
    }

    return null;
  };

  const renderLoggedInItems = () => {
    if (user) {
      const profileSubItems = [];

      profileSubItems.push({
        label:user.email
      });

        profileSubItems.push({
          label: 'My Documents',
          link: Links.Private.myDocs
        });


        profileSubItems.push({
          label: 'Upload document',
          link: Links.Private.upload
        });




      profileSubItems.push({
        label: 'Logout',
        onClick: logout
      });

      const items = [
        <ProfileMenu username={user.email} items={profileSubItems} />
      ];

      return items.map((item, i) => (
        <li key={`nav-logged-in-item-${i}`} className={classes.navItem}>
          {item}
        </li>
      ));
    }

    return null;
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link to={Links.Public.home} className={classes.logo}>
          Chemaxon
        </Link>
        
        <ul className={classes.navList}>
          {menu.map(item => (
            <li key={`nav-item-${item.slug}`} className={classes.navItem}>
              <NavLink to={item.slug}>{item.label}</NavLink>
            </li>
          ))}


          {renderNotLoggedInItems()}

          {renderLoggedInItems()}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
