import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Routes/Home";
import { Grid } from "@mui/material";
import Products from "./components/Routes/Products";
import "./App.css";
import LoginSignUpPages from "./components/Routes/LoginSignUpPages";
import NavBar from "./components/Navbar";
import PrivateComponent from "./components/PrivateComp/PrivateComponent";
import Dashboard from "./components/Dashboard/Dashboard";
import AddProductPage from "./components/Product/AddProductPage";

function App() {
  const location = useLocation();
  const renderNavbar = location.pathname !== "/";
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {renderNavbar && <NavBar />}
        </Grid>
        <Grid item xs={12}>
          <Routes>
            <Route path="/" element={<LoginSignUpPages />} />
            <Route element={<PrivateComponent />}>
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products" element={<Products />} />
              <Route path="/Addproductpage" element={<AddProductPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
