import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen.js';
import ConnectScreen from './screens/ConnectScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import ShippingScreen from './screens/ShippingScreen.js'
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import UserListScreen from './screens/UserListScreen.js';
const App = () => {
  return (
    <>


      <Router>
        <Header />

        <main className='py-3'>
          <Container>



            <Routes>
              <Route path="/login/shipping" element={<ShippingScreen />} />
              <Route path="/orders/:id" element={<OrderScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeconnect" element={<PlaceOrderScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/connect" element={<ConnectScreen />} />
              <Route path="/connect/:id" element={<ConnectScreen />} />
              <Route path="/admin/userlist" element={<UserListScreen />} />
            </Routes>

          </Container>
        </main>
      </Router>
      <Footer />

    </>
  )
}

export default App