import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';

const LoginForm = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setCart } = useContext(CartContext);
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        // Check to make sure we're on the login page
        if (window.location.pathname === '/') {
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                // Delay navigation sligh
                    navigate('/');
            }
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginData({
            ...loginData,
            [name]: type === 'checkbox' ? checked : value
        });
        
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message before validation
        setLoading(true);
    
        if (!loginData.email || !loginData.password) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }
    
        if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:3004/users?email=${loginData.email}`);
            
            if (response.data.length > 0) {
                const user = response.data[0];
    
                if (user.password === loginData.password) {
                    const loggedInUser = user;
    
                    // Store user data in local storage
                    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    
                    try {
                        const userCartKey = `cart_${loggedInUser.id}`;
                        let userCart = [];
    
                        const savedCart = localStorage.getItem(userCartKey);
                        if (savedCart) {
                            userCart = JSON.parse(savedCart);
                        } else if (loggedInUser.cart) {
                            userCart = loggedInUser.cart;
                            localStorage.setItem(userCartKey, JSON.stringify(userCart));
                        }
    
                        setCart(userCart);
                    } catch (cartError) {
                        console.error("Error loading cart:", cartError);
                    }
    
                    setError(''); // Clear any previous error before navigating
                    navigate('/');
                } else {
                    setError('Incorrect password. Please try again.');
                }
            } else {
                setError('Account not found. Please create an account.');
            }
        } catch (error) {
            console.error("Login error:", error);
            setError('Login failed. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="flex flex-col md:flex-row items-center gap-8 p-4 md:p-8 min-h-screen w-full">
            <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6 mb-6 md:mb-0">
                <h1 className="text-2xl font-bold mb-6">Customer Login</h1>
                <p className="mb-6">If you have an account, sign in with your email address.</p>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            disabled={loading}
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            disabled={loading}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 rounded font-medium text-white ${
                            loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>

            <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6">New Customers</h1>
                <p className="mb-6">
                    Creating an account has many benefits: check out faster, keep more than
                    one address, track orders and more.
                </p>
                <button
                    onClick={() => navigate('/register')}
                    className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded font-medium"
                    disabled={loading}
                >
                    Create an Account
                </button>
            </div>
        </div>
    );
};

export default LoginForm;