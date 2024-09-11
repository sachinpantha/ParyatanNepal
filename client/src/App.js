import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Toaster } from 'react-hot-toast';
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
import UserEditScreen from "./screens/UserEditScreen.js";
import LandingPage from "./screens/LandingPage";
import Aos from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
const App = () => {
  useEffect(() => {
    Aos.init({ easing: "ease", duration: 700 });
  }, []);
  const isloggedIn = useSelector(
    (state) => state?.userLogin?.userInfo?.isloggedIn
  );
  useEffect(() => {

  }, [isloggedIn])
  return (
    <>
      <Router>
        <>
          {(isloggedIn || localStorage.getItem("isloggedIn")) && <Header />}

          <main className="py-3">
            <Container>
              <Toaster></Toaster>
              <Routes>
                <Route exact path="/" element={isloggedIn ? <HomeScreen /> : <LandingPage />} />
                <Route path="/shipping" element={<ShippingScreen />} />
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
                <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
              </Routes>
            </Container>
          </main>
          {(isloggedIn || localStorage.getItem("isloggedIn")) && <Footer />}
        </>
      </Router>
    </>
  );
};

export default App;
