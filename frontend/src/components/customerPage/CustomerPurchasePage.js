import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import Review from './Review';
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";




const steps = ['Shipping address', 'Review your order'];

const customerUrl = "http://127.0.0.1:8000/api/Customer/"
const productsUrl = "http://127.0.0.1:8000/api/Products/"
const ordersUrl = "http://127.0.0.1:8000/api/Orders/"




const theme = createTheme();

export default function CustomerPurchasePage() {
  // console.log("CUSTOMER PURCHASE PAGE")
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;



  const [activeStep, setActiveStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [sstate, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');

  const [currentCartTotal, setcurrentCartTotal] = useState(0);

  const [paymentStatus, setPaymentStatus] = useState(null)
  const [notification, setNotification] = useState(null);
  const [customerData, setCustomerData] = useState([])
  const [LoggedInEmail, setLoggedInEmail] = useState(null)
  const [load, setLoad] = useState(false)

  const [customerID, setCustomerID] = useState(null);


  // console.log(state.addCartProduct)



  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (customerData.length > 0 && activeStep === 1) {
      console.log("add customer !")
      addCustomerToDB(firstName, lastName, LoggedInEmail, address1, city, "AC", zip, country);
    }
  }, [customerData, activeStep]);

  const fetchData = async () => {

    axios.get(customerUrl).then((response) => {
      setCustomerData(response.data);
      const userEmail = window.localStorage.getItem('user');
      console.log("PURCHASE  PAGE EMAIL COMP")
      console.log(userEmail)
      setLoggedInEmail(userEmail)
      setLoad(true);
    });
  };


  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getTotalPrice = () => {
    return state.addCartProduct.reduce((total, product) => {

      return total + product.product_price * product.quantity;
    }, 0);
  };


  function handleFormDataChange(formData) {
    setFirstName(formData.firstName);
    setLastName(formData.lastName);
    setAddress1(formData.address1);
    setCity(formData.city);
    setState(formData.state);
    setZip(formData.zip);
    setCountry(formData.country);
  }

  const showToastMessage = () => {
    console.log("TOAST FUNCTION")
    toast.success('Success Notification!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
    });
  };


  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // hide the notification after 3 seconds
  };


  function PurchaseProcess(step) {
    switch (step) {
      case 0:
        return <AddressForm onFormDataChange={handleFormDataChange} />;
      case 1:
        return <Review
          firstName={firstName}
          lastName={lastName}
          address1={address1}
          city={city}
          state={state}
          zip={zip}
          country={country}
        />;

      default:
        throw new Error('Unknown step');
    }
  }

  const updateProductInfo = (paymentCart) => {
    for (let i = 0; i < paymentCart.length; i++) {
      const productId = paymentCart[i].product_id;
      const quantity = paymentCart[i].quantity;

      // fetch the product from the server
      axios.get(`${productsUrl}${productId}/`).then((response) => {
        const product = response.data;

        // update the product quantity
        product.product_quantity -= quantity;

        const form_data = new FormData();
        form_data.append('product_name', product.product_name)
        form_data.append('product_description', product.product_description)
        form_data.append('product_quantity', product.product_quantity)
        form_data.append('product_price', product.product_price)
        form_data.append('product_price_sale', product.product_price_sale)
        form_data.append('product_available', false)
        form_data.append('product_height', product.product_height)
        form_data.append('product_weight', product.product_weight)
        form_data.append('image', product.image)

        axios
          .put(`http://127.0.0.1:8000/api/Products/${productId}/`, form_data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }).catch((error) => {
        console.log(error);
      });
    }
  };


  const createAndPostOrder = (purchase) => {
    console.log(purchase);
    console.log("ORDER METHOD");
    console.log(customerID);

    let form_data = new FormData();

    const totalPrice = getTotalPrice();
    console.log("CURRENT TOTAL");
    console.log(totalPrice);

    form_data.append('order_total', totalPrice);

    // create an array of product IDs and quantities
    const productData = [];
    purchase.forEach((product) => {
      const data = [product.product_id, product.quantity];
      productData.push(data);
    });
    console.log("PRODUCT DATA");
    console.log(productData);

    form_data.append('products', JSON.stringify(productData));
    form_data.append('order_status', true);
    form_data.append('customer', customerID);

    // make a POST request to the server using axios
    axios.post(ordersUrl, form_data)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };





  const addCustomerToDB = async (firstName, lastName, LoggedInEmail, address1, city, state, zip, country) => {
    console.log("TESTTTTTT");
    console.log(LoggedInEmail);
    let existingCustomer = customerData.find((customer) => customer.email === LoggedInEmail);

    if (existingCustomer) {
      console.log(`Customer with email ${LoggedInEmail} already exists`);
      console.log(existingCustomer);
      var Idplaceholder = existingCustomer.customer_id;
      console.log("PRINT ID PLACEHOLDER");
      console.log(Idplaceholder);

      setCustomerID(Idplaceholder);

    } else {
      if (LoggedInEmail) {
        axios.post(customerUrl, {
          firstName: firstName,
          lastName: lastName,
          email: LoggedInEmail,
          address_line: address1,
          postal_code: zip,
          city: city,
          province: state,
          country: country
        }).then((response) => {
          console.log(response.data);
          setCustomerID(response.data.customer_id);
        })
          .catch((error) => {
            console.log(error);
          });

      }
    }
  };

  // useEffect(() => {
  //   console.log("Customer ID updated: ", customerID);
  // }, [customerID]);


  // if (customerID) {
  //   console.log("UPDATE?")
  //   console.log(customerID)
  // }




  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {PurchaseProcess(activeStep)}
              {activeStep === 1 && (
                <PayPalScriptProvider
                  options={{ "client-id": "AcHQWTkvHzl1S-gbtRPE_i6i22tuqmT4DBWdVspfg2N7hv-pi-m-H-C34Cpe2nPOzVw7IV4tl7vZw0i9" }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: getTotalPrice(),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();
                      const name = details.payer.name.given_name;
                      setPaymentStatus(details)
                      console.log("succcess")
                      // addCustomerToDB(firstName, lastName, LoggedInEmail, address1, city, "AC", zip, country);

                      // updateProductInfo(state.addCartProduct)

                      console.log("ON APPROVE FUNCTION ID  ?")
                      console.log(customerID)
                      createAndPostOrder(state.addCartProduct)
                      alert("Purchase is succesfull, redirecting you back to Home screen")

                      navigate('/products')


                    }}


                  />
                </PayPalScriptProvider>
              )}
              {notification && <div className="notification">{notification}</div>}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {/* {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )} */}

                {activeStep === 0 && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Place order
                  </Button>
                )}

              </Box>
            </React.Fragment>
          )}
        </Paper>

      </Container>
    </ThemeProvider >
  );
}