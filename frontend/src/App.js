import './App.css';
import Signin from "./components/loginPage/Signin.js";
import AdminPageView from "./components/adminPage/AdminPageView.js";
import AdminCustomerView from "./components/adminPage/AdminCustomerView.js";
import Signup from "./components/loginPage/Signup.js";


import {
  useNavigate,
  Navigate,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { Routes, Route } from "react-router";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={Signin()} />
        <Route
          exact
          path="/admin-page"
          element={<AdminPageView />}
        />

        <Route
          exact
          path="/admin-customers"
          element={<AdminCustomerView />}
        />

        <Route
          exact
          path="/signin"
          element={<Signin />}

        />

        <Route
          exact
          path="/signup"
          element={<Signup />}

        />

      </Routes>

    </div>
  );

}


export default App;
