import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './SearchBar.css';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
import useDebounce from './hooks/use-debounce.js';
import Checkbox from '@mui/material/Checkbox';


//import ViewEditProducts from "/Users/gouledjeelal/Desktop/school/capstone/frontend/src/components/products/ViewEditProduct.js"
import './products/ViewEditProduct.js';

// frontend / src / components / products / AddProduct.js

import AddProduct from "./products/AddProduct.js"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ariaLabel = { 'aria-label': 'description' };
const url = "http://127.0.0.1:8000/api"
const OrdersUrl = "http://127.0.0.1:8000/api/Orders/"
const customerUrl = "http://127.0.0.1:8000/api/Customer/"
const productsUrl = "http://127.0.0.1:8000/api/Products/"


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


  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    onSale: false,
    searchQuery: ""
  });

  const [checked, setChecked] = useState(false);
  const debouncedFilters = useDebounce(filters, 500);


  const [productClickedInfo, setproductClickedInfo] = useState({});

  const [EditInputLabels, setEditInputLabels] = useState(false)

  const [buttonClicked, setButtonClicked] = useState(false);

  const [OrderData, setOrderData] = useState({})
  const [customerData, setCustomerData] = useState({})
  const [productData, setProductData] = useState({})



  useEffect(() => {
    fetchData()


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



  useEffect(() => {
    fetchOrderData()
    fetchCustomerData()
    fetchProductData()
  }, [])

  const fetchOrderData = async () => {
    axios.get(OrdersUrl).then((response) => {
      setOrderData(response.data);
      const userEmail = window.localStorage.getItem('user');

    });
  };
  const fetchCustomerData = async () => {
    axios.get(customerUrl).then((response) => {
      setCustomerData(response.data);
      const userEmail = window.localStorage.getItem('user');

    });
  };

  const fetchProductData = async () => {
    axios.get(productsUrl).then((response) => {
      setProductData(response.data);
      const userEmail = window.localStorage.getItem('user');

    });
  };

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

    setButtonClicked(false);
    setEditInputLabels(false);
    setOpen(false);
  };

  const updateProductInfo = () => {
    if (buttonClicked) {
      const updatedProduct = {
        product_id: productClickedInfo.productId,
        product_name: productClickedInfo.productName,
        product_description: productClickedInfo.productDescription,
        product_quantity: productClickedInfo.productQuantity,
        product_price: productClickedInfo.productPrice,
        product_price_sale: productClickedInfo.productPriceSale,
        product_weight: productClickedInfo.productWeight,
        product_height: productClickedInfo.productHeight,
        image: productClickedInfo.image
      };

      let form_data = new FormData();
      console.log(productName)
      console.log(productDescription)


      form_data.append('product_name', productName);
      form_data.append('product_description', productDescription);
      form_data.append('product_quantity', productQuantity);
      form_data.append('product_price', productPrice);
      form_data.append('product_height', productHeight);
      form_data.append('product_price_sale', 0)
      form_data.append('product_weight', productWeight);
      console.log(form_data)
      // form_data.append('image', fileurl, fileurl.name);

      console.log(updatedProduct)

      axios
        .put(`http://127.0.0.1:8000/api/Products/${updatedProduct.product_id}/`, form_data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          console.log(response);
          const updatedProducts = [...products];
          const index = updatedProducts.findIndex((product) => product.id === productClickedInfo.id);
          updatedProducts[index] = response.data;
          setProducts(updatedProducts);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setButtonClicked(false);
    setEditInputLabels(false);
    setOpen(false);
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const SidebarFilter = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [showOrders, setShowOrders] = useState(false);


    const handleFiltersClick = () => {
      setShowFilters(true);
      setShowOrders(false);
    };

    const handleOrdersClick = () => {

      setShowOrders(true);
      setShowFilters(false);
    };

    const orderSideBar = () => {
      const orders = OrderData.map(order => {
        const customer = customerData.find(c => c.customer_id === order.customer);
        if (customer) {
          const { firstName, lastName } = customer;
          const products = JSON.parse(order.products);
          const productIds = products.map(([productId]) => productId);
          const orderTotal = order.order_total;
          const productsString = productIds.join(', ');

          return (
            <div className="order" key={order.order_id}>
              <div className="customer">{firstName} {lastName}</div>
              <div className="products">Product IDs: {productsString}</div>
              <div className="total">Total: ${orderTotal}</div>
            </div>
          );
        }
      });

      return <div className="orders">{orders}</div>;
    };



    //   console.log(customer)
    //   return (
    //     <div className="orders-side-bar">
    //       <h2>Customer Orders</h2>
    //       <p>{`${customer.firstName} ${customer.lastName}`}</p>
    //       {orders.map(order => (
    //         <div key={order.order_id}>
    //           <p>Order Total: {order.order_total}</p>
    //           <ul>
    //             {JSON.parse(order.products).map(product => (
    //               <li key={product[0]}>{`Product ID: ${product[0]} - Quantity: ${product[1]}`}</li>
    //             ))}
    //           </ul>
    //         </div>
    //       ))}
    //     </div>
    //   );
    // }




    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: "absolute", left: "25px", top: "140px" }}>
          <Button variant="contained" sx={{ backgroundColor: "rgb(47, 225, 185)", color: 'black', marginRight: "0.5rem", fontWeight: "bold", ':hover': { backgroundColor: "rgb(47, 225, 185)" } }} onClick={handleFiltersClick}>Filters</Button>
          <Button variant="contained" sx={{ backgroundColor: "rgb(47, 225, 185)", color: 'black', fontWeight: "bold", ':hover': { backgroundColor: "rgb(47, 225, 185)" } }} onClick={handleOrdersClick}>Orders</Button>
        </div>

        {
          showFilters && (
            <>
              <TextField
                className="price-filter"
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

              <TextField
                className="price-filter"
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

        {
          showOrders && (
            <div className="orders-sidebar" style={{ display: 'flex', position: 'absolute', left: '15px', top: '250px' }}>
              {orderSideBar()}

            </div>
          )
        }
      </>
    );
  };


  const showproductClick = (productClicked) => {
    const selectedProduct = products[productClicked];
    console.log("SELECTED PRODUCT")
    console.log(selectedProduct)
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
        <input
          type='search'
          placeholder="search.."
          value={filters.searchQuery}
          onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
        />


      </div>

      {SidebarFilter()}

      <div class="straight-line"></div>


      <div className='item-flex-search-bar'>
        {products.map((item, id) => (
          <div onClick={() => showproductClick(id)} key={id} className="product-details-list">
            <div className="product-name">{item.product_name}</div>
            {/* <div className="product-description"> {item.product_description}</div> */}
            <img className="product-img" src={require('/src/productimages/' + item.image.substring(item.image.lastIndexOf('/') + 1))} />
            <div className="product-price-map">{item.product_price + "$"}</div>
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
            {/* product Name placeholder */}
            <div className="product-name-tag">
              <h4 className="product-name">Product Name:</h4>
              <Input style={{
                color: "white",
                "&.Mui-disabled": {
                  WebkitTextFillColor: "white !important"
                }
              }} onChange={e => setproductName(e.target.value)} disabled={!EditInputLabels} fullWidth={true} disableUnderline={true} placeholder="Product Name" label="Test" defaultValue={productClickedInfo.productName} />
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
          {buttonClicked ? (
            <Button onClick={updateProductInfo} className="confirm-changes-button">Confirm Changes</Button>
          ) : null}
          <Button className="edit-window-button" variant="contained" onClick={editFields}>

            {buttonClicked ? "" : "Edit Product Info"}
          </Button>




        </DialogActions>
      </Dialog>
    </div>
  )
}