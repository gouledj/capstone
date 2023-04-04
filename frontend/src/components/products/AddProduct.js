import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import "./AddProduct.css"
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import axios from 'axios';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddProduct() {
  const [open, setOpen] = React.useState(false);
  const [fileurl, setfileurl] = useState(null);

  const [productName, setproductName] = useState(null);
  const [productDescription, setproductDescription] = useState(null);
  const [productQuantity, setproductQuantity] = useState(null);
  const [productPrice, setproductPrice] = useState(null);
  const [productPriceSale, setproductPriceSale] = useState(null);
  const [productWeight, setproductWeight] = useState(null);
  const [productHeight, setproductHeight] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const exitProductAdd = () => {
    setOpen(false);

  }

  const handleClose = () => {
    const true_value = true;

    console.log("post values")

    let form_data = new FormData();
    form_data.append('product_name', productName);
    form_data.append('product_description', productDescription);
    form_data.append('product_quantity', productQuantity);
    form_data.append('product_price', productPrice);
    form_data.append('product_height', productHeight);
    form_data.append('product_price_sale', productPriceSale)
    form_data.append('product_weight', productWeight);
    form_data.append('image', fileurl, fileurl.name);
    let url = 'http://localhost:8000/api/Products/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err))


    setOpen(false);

  };

  const imageUploadPreview = () => {
    const imagePath = "images/" + fileurl
    console.log("PATH", imagePath);


    if (fileurl.length > 0) {
      return (
        <div className="display-preview-image">

          <img src={"images/" + fileurl} alt='image' />
          {/* <img src="images/Screen_Shot_2023-02-03_at_4.48.31_PM.png" alt='logo' /> */}
          {/* #images/Screen_Shot_2023-02-03_at_4.48.31_PM.png */}
        </div>
      )

    }
  }

  return (
    <div>
      <Button size='large' variant="contained" onClick={handleClickOpen} sx={{ backgroundColor: "rgb(47, 225, 185)", fontWeight: "bold", marginRight: '1rem', color: 'black' }}>
        Add Product
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ height: '1000px' }}
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
                <Button variant="contained" id="upload-image-button" className="upload-image-button" component="label">Upload Image

                  <input
                    accept="images/*"
                    type="file"
                    hidden
                    onChange={e => setfileurl(e.target.files[0])}
                    style={{ display: 'none' }}


                  />
                </Button>
              </div>

            </div>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={exitProductAdd}>Exit</Button>
          <Button onClick={handleClose}>Add Product</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}