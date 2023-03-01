import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './SearchBar.css';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
// frontend / src / components / products / ViewEditProduct.js

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Input from '@mui/material/Input';


import ViewEditProducts from "/Users/gouledjeelal/Desktop/school/capstone/frontend/src/components/products/ViewEditProduct.js"


// frontend / src / components / products / AddProduct.js

import AddProduct from "./products/AddProduct.js"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ariaLabel = { 'aria-label': 'description' };


//Search bar functionality will handle search but also items that come up below, don't make another component for it.
//Have an onlick function thats calls another function, and that function sets the state of the props and calls it to another function
export default function SearchBar() {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);
  const [productClick, setproductClick] = useState(false);

  //OnClick product view

  const [open, setOpen] = React.useState(false);
  const [productName, setproductName] = useState(null);
  const [productDescription, setproductDescription] = useState(null);
  const [productQuantity, setproductQuantity] = useState(null);
  const [productPrice, setproductPrice] = useState(null);
  const [productPriceSale, setproductPriceSale] = useState(null);
  const [productWeight, setproductWeight] = useState(null);
  const [productHeight, setproductHeight] = useState(null);

  const [productClickedInfo, setproductClickedInfo] = useState({});

  const [EditInputLabels, setEditInputLabels] = useState(false)

  const [buttonClicked, setButtonClicked] = useState(false);



  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/Products/")
      .then((response) => {
        setProducts(response.data);
        setLoad(true);

      })
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const exitProductAdd = () => {
    setOpen(false);
    setproductClick(false);
  }

  //when product is clicked
  const editFields = () => {
    setButtonClicked(true);
    setEditInputLabels(true);
    console.log("PRESS")

  };

  const handleClose = () => {
    const true_value = true;

    // console.log("post values")
    // setOpen(false);
    // setButtonClicked(true);
    setOpen(false);
    // setButtonClicked(true);
    // setEditInputLabels(true);


  };
  const showproductClick = (productClicked) => {
    const selectedProduct = products[productClicked];
    console.log(selectedProduct)
    const imageShortenUrl = selectedProduct.image.substring(selectedProduct.image.lastIndexOf('/') + 1)
    setproductClickedInfo({
      productName: selectedProduct.product_name,
      productDescription: selectedProduct.product_description,
      productQuantity: selectedProduct.product_quantity,
      productPrice: selectedProduct.product_price,
      productPriceSale: selectedProduct.product_price_sale,
      productWeight: selectedProduct.product_weight,
      productHeight: selectedProduct.product_height,
      productImage: imageShortenUrl
    });
    setOpen(true);

    // console.log(products[productClicked]);
    return (

      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
        </Button> */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


  // console.log(products)
  return (
    <div className="item-gallery-box">
      <div className="search-bar">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          sx={{ width: '1240px', backgroundColor: '#ECEBF1', borderRadius: '3rem' }}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
      </div>

      <div className='item-flex'>
        {products.map((item, id) => (
          <div onClick={() => showproductClick(id)} key={id} className="product-details-list">
            <div className="product-name">{item.product_name}</div>
            {/* <div className="product-description"> {item.product_description}</div> */}
            <img className="product-img" src={require('/src/productimages/' + item.image.substring(item.image.lastIndexOf('/') + 1))} />
            <div className="product-price">{item.product_price + "$"}</div>
            {/* <div className="product-ships">{item.product_height}</div> */}
            <div className="product-avaliable">{item.product_available === "false" ? "true" : "Avaliable "}</div>
          </div>
        ))}
      </div>

      <Dialog className='product-click-window' open={open} onClose={handleClose}>
        <DialogContent>
          {productClickedInfo.productImage ? (
            <img className="product-clicked-img" src={require('/src/productimages/' + productClickedInfo?.productImage)} />
          ) : null}

          <div className="product-details">

            <Input disabled={!EditInputLabels} fullWidth={true} disableUnderline={true} placeholder="Product Name" defaultValue={"Product Name: " + productClickedInfo.productName} />
            <Input disabled={!EditInputLabels} fullWidth={true} disableUnderline={true} placeholder="Price" defaultValue={"Product Price: " + productClickedInfo.productPrice + "$"} />
            <Input disabled={!EditInputLabels} fullWidth={true} disableUnderline={true} placeholder="Dimensions" defaultValue={"Product Dimensions: " + productClickedInfo.productHeight + "x" + productClickedInfo.productWidth} />
            <Input disabled={!EditInputLabels} fullWidth={true} disableUnderline={true} placeholder="Weight" defaultValue={"Product Weight: " + productClickedInfo.productWeight} />
            <Input disabled={!EditInputLabels} fullWidth={true} disableUnderline={true} placeholder="Quantity" defaultValue={"Product Quantity: " + productClickedInfo.productQuantity} />
          </div>
          <h3 className="product-description-title">Product Description</h3>
          <Input disabled={!EditInputLabels} disableUnderline={true} multiline={true} placeholder="Product Description" defaultValue={productClickedInfo.productDescription} inputProps={ariaLabel} />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>
            {buttonClicked ? "Changes Made" : "Make Changes"}
          </Button> */}
          {/* {buttonClicked ? "Changes Made" : "Make Changes"} */}
          <Button className="edit-window-button" variant="contained" onClick={editFields}>
            {/* {buttonClicked ?
              <Button className="new-test" />
            
          } : null} */}
            {buttonClicked ? "Save Changes" : "Edit Product Info"}
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  )
}