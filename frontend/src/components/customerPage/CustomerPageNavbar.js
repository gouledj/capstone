import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import '../adminPage/AdminPageView.css'
import { useNavigate } from 'react-router-dom';


const pages = [

  {
    name: 'Account',
    link: '/account'
  }
  // {
  //   name: 'Shopping Cart',
  //   link: '/orders'
  // }
];
const settings = ['Profile', 'Account', 'Dashboard'];

function CustomerPageNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate(); // add useNavigate hook


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = (e) => {
    localStorage.clear()
    navigate('/'); // redirect to homepage
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', paddingRight: '5rem', }}
                href={page.link}
              >
                {page.name}
              </Button>
            ))}

            <Button className="signOutButton" variant="contained" onClick={(e) => handleSignOut(e)}>Sign Out Button</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}

export default CustomerPageNavbar;