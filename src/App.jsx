import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistrationForm from './pages/Register';
import LoginForm from './pages/Login';
import HomePage from './pages/Home';
import Navbar from './pages/Navbar';
import { AuthProvider } from './NavbarContext/NavbarContext';
import CartPage from './pages/CartPage';
import { CartProvider } from './CartContext/CartContext';

import Wheels from './pages/Wheels';
import ExhaustSystems from './pages/ExhaustSystems';
import Turbocharger from './pages/Turbocharger';
import NOS from './pages/NOS';
import Engine from './pages/Engine';
import Brakes from './pages/Brakes';
import Accessories from './pages/Accessories';
import Tools from './pages/Tools';
import ConfirmOrder from './pages/ConfirmOreder';
import UserAddressPage from './pages/UserAddress';
import OrderPage from './pages/OrderPage';
import Account from './pages/Account';
import ConfirmationPage from './pages/ConfirmationPage ';
import AdminDashboard from './pages/AdminDashbord';
import ManageOrders from './pages/ManageUsers';
import ManageProducts from './pages/ManageProducts';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/register" element={<RegistrationForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path='/nav' element={<Navbar />} />

                        <Route path="/wheels" element={<Wheels />} />
                        <Route path="/exhaust-systems" element={<ExhaustSystems />} />
                        <Route path="/engine" element={<Engine />} />
                        <Route path="/turbocharger" element={<Turbocharger />} />
                        <Route path="/brakes" element={<Brakes />} />
                        <Route path="/accessories" element={<Accessories />} />
                        <Route path="/tools" element={<Tools />} />
                        <Route path="/nos" element={<NOS />} />
                        <Route path="/confirm" element={<ConfirmOrder />} />
                        <Route path="/address" element={<UserAddressPage />} />
                        <Route path="/order" element={<OrderPage />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/confirmation" element={<ConfirmationPage />} />

                        <Route path="/admindashboard" element={<AdminDashboard />} />
                        <Route path="/admin/products" element={<ManageProducts/>} />
                        <Route path="/admin/users" element={<ManageOrders/>} />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;