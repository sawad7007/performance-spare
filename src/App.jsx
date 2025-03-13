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

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <Routes>
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
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;