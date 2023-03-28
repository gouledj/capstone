import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './productSearch.css';
import Box from '@mui/material/Box';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import ShoppingCart from './ShoppingCart';


// frontend / src / components / products / ViewEditProduct.js

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import useDebounce from '../hooks/use-debounce.js';
import FilterSideBar from './FilterSidebar.js'
import shoppingCartImage from './shopping_cart.png'

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useLocation } from 'react-router-dom';



const ariaLabel = { 'aria-label': 'description' };

const url = "http://127.0.0.1:8000/api"


//Search bar functionality will handle search but also items that come up below, don't make another component for it.
//Have an onlick function thats calls another function, and that function sets the state of the props and calls it to another function
export default function CustomerProductPage() {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);
  const [productClick, setproductClick] = useState(false);
  const [searchQuery, setsearchQuery] = useState("")
  const [userEmail, setUserEmail] = useState(null);
  const location = useLocation();
  const { state } = location



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
  const [selectedCategory, setSelectedCategory] = useState();

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [selectedProduct, setSelectedProduct] = useState({})
  const [addCartProduct, setAddCartProduct] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();


  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    onSale: false,
    searchQuery: ""
  });

  const [checked, setChecked] = useState(false);
  const debouncedFilters = useDebounce(filters, 500);


  const signInDiv = document.getElementById('signInDiv');
  if (signInDiv) {
    signInDiv.hidden = true;
  }


  useEffect(() => {
    fetchData()
    setUserEmail(state)


  }, [debouncedFilters])

  const fetchData = async () => {
    let endpoint = `${url}/Products`;

    if (debouncedFilters.minPrice !== '' && debouncedFilters.maxPrice !== '') {
      endpoint += `?product_price__gte=${debouncedFilters.minPrice}&product_price__lte=${debouncedFilters.maxPrice}`;
    } else if (debouncedFilters.minPrice !== '') {
      endpoint += `?product_price__gte=${debouncedFilters.minPrice}`;
    } else if (debouncedFilters.maxPrice !== '') {
      endpoint += `?product_price__lte=${debouncedFilters.maxPrice}`;
    }

    if (debouncedFilters.searchQuery) {
      endpoint += `${endpoint.includes('?') ? '&' : '?'}product_name=${debouncedFilters.searchQuery}`;
    }

    axios.get(endpoint).then((response) => {
      setProducts(response.data);
      setLoad(true);
    });
  };

  //when product is clicked
  const editFields = () => {
    setButtonClicked(true);
    setEditInputLabels(true);
    console.log("PRESS")

  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


  const handleClose = () => {

    setButtonClicked(false);
    setEditInputLabels(false);
    setOpen(false);
  };


  const showproductClick = (productClicked) => {
    setSelectedProduct(products[productClicked])

    // console.log("SELECTED PRODUCT")
    // console.log(selectedProduct)
    const imageShortenUrl = selectedProduct.image.substring(selectedProduct.image.lastIndexOf('/') + 1)

    setproductName(selectedProduct.product_name)
    setproductPrice(selectedProduct.product_price)
    setproductHeight(selectedProduct.product_height)
    setproductWeight(selectedProduct.product_weight)
    setproductQuantity(selectedProduct.product_quantity)
    setproductDescription(selectedProduct.product_description)

    setproductClickedInfo({
      productId: selectedProduct.product_id,
      productName: selectedProduct.product_name,
      productDescription: selectedProduct.product_description,
      productQuantity: selectedProduct.product_quantity,
      productPrice: selectedProduct.product_price,
      productPriceSale: selectedProduct.product_price_sale,
      productWeight: selectedProduct.product_weight,
      productHeight: selectedProduct.product_height,
      productImage: imageShortenUrl
    });
    console.log(imageShortenUrl)
    setOpen(true);

    // console.log(products[productClicked]);

  }


  const sidebarFilter = () => {

    return (
      <>


        <div style={{ display: 'inline-flex', alignItems: 'center', position: "absolute", left: "25px", top: "200px" }}>
          <p style={{ margin: 0, marginRight: '8px' }}>On Sale</p>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            labelPlacement="start"
          />
        </div>

        <TextField className="price-filter"
          label="Minimum Price"
          type="number"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          sx={{
            display: 'flex',
            position: 'absolute',
            left: '15px',
            top: '300px'
          }}
        />

        <TextField className="price-filter"
          label="Max Price"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          sx={{
            display: 'flex',
            position: 'absolute',
            left: '15px',
            top: '385px'
          }}
        />
      </>
    )



  }

  const ShoppingCartFunc = (id) => {
    const selectedProduct = products[id];
    const existingProductIndex = addCartProduct.findIndex(product => product.id === selectedProduct.id);

    if (existingProductIndex !== -1) {
      // product already exists in the cart, update its quantity
      const updatedCart = addCartProduct.map((product, index) => {
        if (index === existingProductIndex) {
          return { ...product, quantity: product.quantity + 1 };
        } else {
          return product;
        }
      });
      setAddCartProduct(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // product doesn't exist in the cart, add it
      const newProduct = {
        ...selectedProduct,
        id: Date.now(), // generate a unique id value
        quantity: 1, // initialize the quantity to 1
      };
      setAddCartProduct((prevProducts) => [...prevProducts, newProduct]);
      localStorage.setItem('cart', JSON.stringify([...addCartProduct, newProduct]));
    }
  };

  const updateQuantity = (id, quantity) => {
    const existingProductIndex = addCartProduct.findIndex(product => product.id === id);

    if (existingProductIndex !== -1) {
      // product already exists in the cart, update its quantity
      const updatedCart = addCartProduct.map((product, index) => {
        if (index === existingProductIndex) {
          return { ...product, quantity };
        } else {
          return product;
        }
      });
      setAddCartProduct(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };



  const getTotalPrice = () => {
    return addCartProduct.reduce((total, product) => {
      return total + product.product_price * product.quantity;
    }, 0);
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setAddCartProduct(cartItems);
  }, []);


  const goToPurchasePage = () => {
    console.log("shopping  cart button")
    console.log(addCartProduct)
    navigate("/purchase-page", { state: { addCartProduct, userEmail } });



  }


  return (
    <div className="item-gallery-box">
      <div className="search-bar">
        <input
          type='search'
          placeholder="search.."
          value={filters.searchQuery}
          onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
        />


      </div>
      {sidebarFilter()}
      <div class="straight-line"></div>

      <>
        <IconButton
          sx={{ position: "absolute", top: '15px', left: '1350px' }}
          onClick={() => setCartOpen(true)}
          color="inherit"
        >
          <Badge badgeContent={addCartProduct.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)} >
          <div style={{ padding: '16px', backgroundColor: "antiquewhite" }}>
            {addCartProduct.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul>
                <div style={{ display: 'flex', justifyContent: "center" }}>
                  <h2>Your Shopping Cart</h2>
                </div>

                {addCartProduct.map((product) => (
                  <li key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ marginBottom: '-1rem' }}>{product.product_name}</h4>
                      <div className="product-information" style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="priceAndTotalShoppingCart" style={{ marginRight: '1rem' }}>
                          <div className='shopping-cart-container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='left-side-shopping-cart'>
                              <p>Price: ${product.product_price.toFixed(2)}</p>
                              <button className="shopping-cart-add-button" onClick={() => updateQuantity(product.id, product.quantity - 1)}>-</button>
                              <span style={{ margin: '0 0.5rem', paddingLeft: '6rem', paddingRight: '6rem', }}>{product.quantity}</span>
                            </div>
                            <div className="right-side-shopping-cart">
                              <p>Total: ${product.product_price.toFixed(2) * product.quantity}</p>
                              <button className="shopping-cart-add-button" onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
                            </div>
                          </div>
                        </div>
                        <img className="product-img-shopping-cart" src={require('/src/productimages/' + product.image.substring(product.image.lastIndexOf('/') + 1))} style={{ maxWidth: '10rem', maxHeight: '10rem' }} />
                      </div>
                    </div>
                  </li>
                ))}

                <hr />
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </li>

                <button className="shopping-cart-clear-button" onClick={() => { setAddCartProduct([]); localStorage.removeItem('cart'); }}>Clear Cart</button>
              </ul>
            )}


            <div className="shopping-cart-order-button" onClick={goToPurchasePage} style={{ display: "flex", justifyContent: "center" }}>
              <Button style={{ display: 'flex', color: "black" }} variant="contained">Proceed to Orders Page</Button>
            </div>

          </div>
        </Drawer>


      </>

      <div className='item-flex'>
        {products && products.map((item, id) => (

          <div key={id} className="product-details-list">

            <div className="product-name">{item.product_name}</div>
            {/* <div className="product-description"> {item.product_description}</div> */}
            <img onClick={() => showproductClick(id)} className="product-img" src={require('/src/productimages/' + item.image.substring(item.image.lastIndexOf('/') + 1))} />
            <div className="product-price-map">{"$ " + item.product_price.toFixed(2)}</div>
            <div className="product-avaliable">{"Quantity: " + item.product_quantity}</div>
            <button className="shopping-cart-button" onClick={() => ShoppingCartFunc(id)}>
              <img className="shopping-cart-image" src={shoppingCartImage} />
            </button>

            <Button variant="contained" color="primary" size="large" style={{ padding: '3px 10px', background: '#D9D9D9', mixBlendMode: 'overlay', marginTop: '1rem', color: 'black', marginLeft: "8.5rem" }}>
              Buy Now
            </Button>

          </div>

        ))}
        {/* {addCartProduct && <ShoppingCart prop={addCartProduct} />} */}


      </div>

      <Dialog className='product-click-window' open={open} onClose={handleClose}>
        <DialogContent>
          {productClickedInfo.productImage ? (
            <img className="product-clicked-img" src={require('/src/productimages/' + productClickedInfo?.productImage)} />
          ) : null}


          <div className="product-details">
            {/* product Name placeholder */}
            <div className="product-name-tag">
              <h4 className="product-name">Product Name:</h4>
              <Input className="product-name-input" onChange={e => setproductName(e.target.value)} disabled={!EditInputLabels} fullWidth={true} disableUnderline={true} placeholder="Product Name" label="Test" defaultValue={productClickedInfo.productName} />
            </div>

            {/* product price placeholder */}
            <div className="product-price-tag">
              <h4 className="product-price">Product Price:</h4>
              <Input onChange={e => setproductPrice(e.target.value)} disabled={!EditInputLabels} fullWidth={true} disableUnderline={true} placeholder="Price" defaultValue={productClickedInfo.productPrice + "$"} />
            </div>

            <div className="product-dimensions-tag">
              <h4 className="product-dimensions">Product Dimensions:</h4>
              <Input onChange={e => setproductHeight(e.target.value)} disabled={!EditInputLabels} fullWidth={true} disableUnderline={true} placeholder="Dimensions" defaultValue={productClickedInfo.productHeight + "x" + productClickedInfo.productWidth} />
            </div>

            <div className="product-weight-tag">
              <h4 className="product-weight">Product Weight</h4>
              <Input onChange={e => setproductWeight(e.target.value)} disabled={!EditInputLabels} fullWidth={true} disableUnderline={true} placeholder="Weight" defaultValue={productClickedInfo.productWeight + 'kg'} />
            </div>

            <div className="product-quantity-tag">
              <h4 className="product-quantity">Product Quantity</h4>
              <Input onChange={e => setproductQuantity(e.target.value)} disabled={!EditInputLabels} fullWidth={true} disableUnderline={true} placeholder="Quantity" defaultValue={productClickedInfo.productQuantity} />
            </div>


          </div>


          <h3 className="product-description-title">Product Description</h3>
          <Input onChange={e => setproductDescription(e.target.value)} disabled={!EditInputLabels} disableUnderline={true} multiline={true} placeholder="Product Description" defaultValue={productClickedInfo.productDescription} inputProps={ariaLabel} />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>
            {buttonClicked ? "Changes Made" : "Make Changes"}
          </Button> */}
          {/* {buttonClicked ? "Changes Made" : "Make Changes"} */}

          <Button className="edit-window-button" variant="contained" onClick={editFields}>

            {buttonClicked ? "" : "Edit Product Info"}
          </Button>




        </DialogActions>
      </Dialog>
    </div >
  )
}