import './App.css';
import Signin from "./components/loginPage/Signin.js";
import AdminPageView from "./components/adminPage/AdminPageView.js";
import AdminCustomerView from "./components/adminPage/AdminCustomerView.js";
import AdminViewOrders from './components/adminPage/AdminViewOrders.js';
import DataAnalyticsView from './components/adminPage/DataAnalyticsView.js';
import Signup from "./components/loginPage/Signup.js";
import CustomerPage from './components/customerPage/CustomerPage.js'
import CustomerPurchasePage from './components/customerPage/CustomerPurchasePage.js'
import AddressForm from './components/customerPage/AddressForm.js'
import { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"
import Button from '@mui/material/Button';
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState({})
  const navigate = useNavigate();
  const [onProductsPage, setOnProductsPage] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setOnProductsPage(true);
      setAuthenticated(true);
    }

    const initializeGoogleAPI = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: "1073496420594-0kami03n19dt19tanoo1cqhsalte1irl.apps.googleusercontent.com",
          callback: handleCallbackResponse
        });
        window.google.accounts.id.renderButton(
          document.getElementById('signInDiv'),
          {
            theme: "outline",
            size: "large",
            onSuccess: handleCallbackResponse,
            onError: (error) => console.log(error),
            onAutoLoadFinished: () => {
              const signInDiv = document.getElementById('signInDiv');
              if (signInDiv) {
                signInDiv.classList.toggle('hide', onProductsPage);
              }
            }
          }
        );
      } else {
        setTimeout(initializeGoogleAPI, 1000); // wait for Google API to load
      }
    }

    initializeGoogleAPI();
  }, [authenticated, onProductsPage]);

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential)
    setUser(userObject)
    localStorage.setItem("user", JSON.stringify(userObject.email));
    setOnProductsPage(true); // Update onProductsPage state to true
    const tempEmail = userObject.email
    navigate('/products', { state: { tempEmail } });
    const signInDiv = document.getElementById('signInDiv');
    if (signInDiv) {
      signInDiv.hidden = true;
    }
    setAuthenticated(true);
  }

  function renderGoogleButton() {
    if (showButton) {
      return (
        <>

          <div className="login-background">
            <div className="image-placeholder"></div>

            <div id="signInDiv" className="google-button">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowButton(false);
                }}
              >
                Login with Google
              </Button>
            </div>


          </div>

        </>
      );
    }
    return null;
  }






  return (
    <div className="App">

      {/* <img className="login-image" src={require("./pmv-chamara-wy7OK3cFqAY-unsplash.jpg")} alt="Google login" /> */}



      <Routes>
        <Route path="" element={renderGoogleButton()} />
        <Route path="/" element={renderGoogleButton()} />
        <Route exact path="/admin-page" element={authenticated ? <AdminPageView /> : renderGoogleButton()} />
        <Route exact path="/admin-customers" element={<AdminCustomerView />} />
        <Route exact path="/data-analytics" element={<DataAnalyticsView />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/products" element={authenticated ? <CustomerPage /> : renderGoogleButton()} />
        <Route exact path="/purchase-page" element={authenticated ? <CustomerPurchasePage /> : renderGoogleButton()} />
        <Route exact path="/orders" element={authenticated ? <AdminViewOrders /> : renderGoogleButton()} />



      </Routes>
    </div>
  );
}

export default App;
