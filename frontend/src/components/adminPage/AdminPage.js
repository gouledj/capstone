import React from 'react'
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
import AdminNavbar from './AdminNavbar.js';

import SearchBar from "../SearchBar.js"
import AdminPage from './AdminPage.css'
import Stack from '@mui/material/Stack';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function adminPage() {



  return (
    <>
      <div className="navbar">
        <AdminNavbar />
      </div>
      <div className="right-side">
        <SearchBar />
        <div className="CRUD-products">
          <Button className="add-product" variant="contained">Add a Product</Button>
        </div>
      </div>


    </>


  )
}

export default adminPage