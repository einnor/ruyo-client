import React, { ReactElement, useState } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Hidden,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  List as ListIcon,
  ExitToAppOutlined,
  AccountCircleOutlined,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import LogoImage from 'assets/images/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.contrastText,
    height: '100vh',
    minWidth: '100vw',
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      height: '100vh',
    },
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  rightToolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: theme.spacing(25),
  },
  whiteColor: {
    color: theme.palette.primary.contrastText,
  },
  toolBar: {
    width: '100%',
  },
  menuWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  list: {
    width: 250,
  },
  main: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      height: '100%',
    },
    overflowY: 'scroll',
  },
}));

interface IProps extends RouteComponentProps {
  children: ReactElement;
}

const MainLayout = ({ children, history }: IProps) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  const logout = () => {
    // TODO reset store
    localStorage.clear();
    redirectTo('/sign-in');
  };

  const redirectTo = (path: string) => {
    history.push(path);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Container style={{ paddingRight: 0, paddingLeft: 0 }}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.rightToolbar}>
              <Hidden mdUp>
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Avatar
                variant="square"
                src={LogoImage}
                alt="Logo"
                className={classes.logo}
              />
            </div>
            <div className={classes.menuWrapper}>
              <Hidden smDown implementation="css">
                <Typography component="span">John Doe</Typography>
              </Hidden>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleOutlined />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Sign Out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
        <Hidden mdUp implementation="js">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
            <div>
              <div className={classes.list} role="presentation">
                <List>
                  <ListItem button onClick={() => redirectTo('/orders')}>
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                  </ListItem>
                  <ListItem button onClick={logout}>
                    <ListItemIcon>
                      <ExitToAppOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </div>
            </div>
          </Drawer>
        </Hidden>
      </AppBar>
      <Container maxWidth="lg" className={classes.root}>
        <Container maxWidth="lg" component="main" className={classes.main}>
          {children}
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(MainLayout);
