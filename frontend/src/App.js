import './App.css';
import Signin from "./components/loginPage/Signin.js";
import AdminPageView from "./components/adminPage/AdminPageView.js";
import AdminCustomerView from "./components/adminPage/AdminCustomerView.js";
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

const google = window.google;

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

      // navigate('/products');
    }

    /* global google */
    google.accounts.id.initialize({
      client_id: "1073496420594-0kami03n19dt19tanoo1cqhsalte1irl.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
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
  }, [])

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential)
    setUser(userObject)
    localStorage.setItem("user", JSON.stringify(userObject)); // Store user object in localStorage
    setOnProductsPage(true); // Update onProductsPage state to true
    const tempEmail = userObject.email
    navigate('/products', { state: { tempEmail } });

    // navigate("/purchase-page", { state: { addCartProduct } });


    // Remove sign-in button from DOM
    const signInDiv = document.getElementById('signInDiv');
    if (signInDiv) {
      signInDiv.hidden = true;
    }
    setAuthenticated(true);
  }

  function renderGoogleButton() {
    if (showButton) {
      return <div id="signInDiv"></div>;
    }
    return null;
  }




  return (
    <div className="App">
      <Routes>
        <Route path="/" element={renderGoogleButton()} />
        <Route exact path="/admin-page" element={authenticated ? <AdminPageView /> : renderGoogleButton()} />
        <Route exact path="/admin-customers" element={<AdminCustomerView />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/products" element={authenticated ? <CustomerPage /> : renderGoogleButton()} />
        <Route exact path="/purchase-page" element={authenticated ? <CustomerPurchasePage /> : renderGoogleButton()} />


      </Routes>
    </div>
  );
}

export default App;
