import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { ToastContainer } from "react-toastify";
import ProductScreen from "./screens/ProductScreen.js";
import ConnectScreen from "./screens/ConnectScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import OrderScreen from "./screens/OrderScreen.js";
import UserListScreen from "./screens/UserListScreen.js";
import LandingPage from "./screens/LandingPage";
import Aos from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import ServiceScreen from "./screens/ServiceScreen";
import HotelScreen from "./screens/HotelScreen";
import Items from "./screens/ItemProducts/Items";
import Hotels from "./screens/Hotels/HotelScreen";
const App = () => {
  useEffect(() => {
    Aos.init({ easing: "ease", duration: 700 });
  }, []);
  const isloggedIn = useSelector(
    (state) => state?.userLogin?.userInfo?.isloggedIn
  );
  useEffect(() => {}, [isloggedIn]);
  return (
    <>
      <Router>
        <>
          {(isloggedIn || localStorage.getItem("isloggedIn")) && <Header />}

          <main>
            {/* <Container> */}
            <ToastContainer></ToastContainer>
            <Routes>
              <Route
                path="/"
                element={isloggedIn ? <ServiceScreen /> : <LandingPage />}
              />
              <Route path="/guides" element={<HomeScreen />} />
              {/* <Route path="/items" element={<Items />} /> */}
              <Route path="/hotels" element={<Hotels />} />
              {/* <Route path="/hotels" element={<HotelScreen />} /> */}
              <Route path="/local-vendors" element={<Items />} />
              <Route path="/login/shipping" element={<ShippingScreen />} />
              <Route path="/orders/:id" element={<OrderScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeconnect" element={<PlaceOrderScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/connect" element={<ConnectScreen />} />
              <Route path="/connect/:id" element={<ConnectScreen />} />
              <Route path="/admin/userlist" element={<UserListScreen />} />
            </Routes>
            {/* </Container> */}
          </main>
          {(isloggedIn || localStorage.getItem("isloggedIn")) && <Footer />}
        </>
      </Router>
    </>
  );
};

export default App;
