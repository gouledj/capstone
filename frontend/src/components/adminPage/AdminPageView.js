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
import './AdminPageView.css'
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import AddProduct from '../products/AddProduct.js';



const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function AdminPageView() {

  const [dialogState, setdialogState] = useState(false);
  const [addButton, setaddButton] = useState(false);

  const openDialog = () => {
    if (addButton) {
      console.log("ADD PRODUCT")
      return (

        <div className="add-product-dialog">
          <AddProduct />

        </div>
      )


    }


  }
  return (
    <>
      <div className="navbar">
        <AdminNavbar />
      </div>
      {/* <Button className="add-product"  variant="contained">Add a Product
      </Button> */}
      <AddProduct className="add-product-button" />


      <div className="product-list">
        <SearchBar />

        <div className="products">
          <div className="text-test">
          </div>

        </div>
      </div>


    </>


  )
}

export default AdminPageView;