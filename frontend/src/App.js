import './App.css';
import LoginPage from "./components/loginPage/LoginPage.js";
import AdminPage from "./components/adminPage/AdminPage.js";

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
          element={<AdminPage />}
        />

      </Routes>

    </div>
  );

}


export default App;
