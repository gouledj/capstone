import './App.css';
import LoginPage from "./components/loginPage/LoginPage.js";
import AdminPageView from "./components/adminPage/AdminPageView.js";

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
        <Route path="/" element={LoginPage()} />
        <Route
          exact
          path="/admin-page"
          element={<AdminPageView />}
        />

      </Routes>

    </div>
  );

}


export default App;
