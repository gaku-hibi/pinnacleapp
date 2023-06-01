import React from 'react';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';

const DrawerContent = styled('div')({
  width: 250,
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render () {
    const sideList = (
      <DrawerContent>
        <List>
          <Link to="/">
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to="/baros">
            <ListItem button>
              <ListItemText primary="⊿Baro" />
            </ListItem>
          </Link>
        </List>
      </DrawerContent>
    );

    return (
      <AppBar position="relative" color="inherit" sx={{ flexGrow: 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={this.state.left} onClose={this.toggleDrawer('left', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('left', false)}
              onKeyDown={this.toggleDrawer('left', false)}
            >
              {sideList}
            </div>
          </Drawer>
          <strong>
            <Link to="/" style={{ boxShadow: 'none', textDecoration: 'none', color: 'inherit' }}>PinnaFox</Link>
          </strong>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
};

export default Header;
