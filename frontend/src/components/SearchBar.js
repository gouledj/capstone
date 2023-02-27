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

import ViewEditProducts from "/Users/gouledjeelal/Desktop/school/capstone/frontend/src/components/products/ViewEditProduct.js"


// frontend / src / components / products / AddProduct.js

import AddProduct from "./products/AddProduct.js"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


//Search bar functionality will handle search but also items that come up below, don't make another component for it.
//Have an onlick function thats calls another function, and that function sets the state of the props and calls it to another function
function SearchBar() {
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

  const [productClickedInfo, setproductClickedInfo] = useState({ productName: 'test', productDescription: 'hellooo' });






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

  const handleClose = () => {
    const true_value = true;

    console.log("post values")
    setOpen(false);

  };

  const showproductClick = (props) => {
    setproductClick(true);
    console.log(props)
  }



  const productClickItem = (props) => {
    console.log(props)
    return (
      <div>
        {/* <Button variant="contained" onClick={handleClickOpen}>
          Add Product
        </Button> */}
        <Dialog
          onClick={handleClickOpen}
          open={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ color: "white" }}>{"Fill the required fields below to add a product!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div className="product-field">
                <div className="input-fields">
                  <TextField id="product-name-field" onChange={e => setproductName(e.target.value)} label="Product Name" variant="outlined" />
                  <TextField id="product-description-field" onChange={e => setproductDescription(e.target.value)} label="Product Description" variant="outlined" />
                  <TextField id="product-quantity-field" onChange={e => setproductQuantity(e.target.value)} label="Quantity" variant="outlined" />
                  <TextField id="product-price-field" onChange={e => setproductPrice(e.target.value)} label="Price" variant="outlined" />
                  <TextField id="product-sale-price-field" onChange={e => setproductPriceSale(e.target.value)} label="Sale Price " variant="outlined" />
                  <TextField id="product-weight-field" onChange={e => setproductWeight(e.target.value)} label="Weight" variant="outlined" />
                  <TextField id="product-height-field" onChange={e => setproductHeight(e.target.value)} label="Height" variant="outlined" />

                  {/* {console.log(fileurl)} */}

                </div>

              </div>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={exitProductAdd}>Exit</Button>
            <Button onClick={handleClose}>Add Product</Button>
          </DialogActions>
        </Dialog>
      </div>
    );

  }

  console.log(products)
  return (

    <div className="item-gallery-box">
      <div className="search-bar">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: '1240px', backgroundColor: '#ECEBF1', borderRadius: '3rem' }}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />

      </div>

      <div className='item-flex'>
        {products.map((item, id) => (

          <div onClick={showproductClick(item.product_name)} key={id} className="product-details-list">

            <div className="product-name">{item.product_name}</div>
            <div className="product-description"> {item.product_description}</div>
            <img className="product-img" src={require('/src/productimages/' + item.image.substring(item.image.lastIndexOf('/') + 1))} />
            <div className="product-price">{item.product_price}</div>
            <div className="product-ships">{item.product_height}</div>
            <div className="product-avaliable">{item.product_available === "false" ? "false" : "true"}</div>


          </div>



        ))}
      </div>


    </div>
  )
}

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
]

export default SearchBar