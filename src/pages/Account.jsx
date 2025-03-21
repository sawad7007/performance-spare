import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCardIcon, CurrencyRupeeIcon, ClockIcon, LogoutIcon, MapIcon, PhoneIcon } from '@heroicons/react/outline';
import Navbar from './Navbar';

const Account = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Backend API call for fetching order history
        fetch('http://localhost:3004/orders') // API URL replace cheyyuka
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Account</h1>

                {/* Order History */}
                <div className="bg-white shadow-md p-4 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold">Order History</h2>
                    {orders.length > 0 ? (
                        <ul className="list-disc pl-5 text-gray-600">
                            {orders.map(order => (
                                <li key={order.id} className="mb-2">
                                    <span className="font-semibold">{order.itemName}</span> - ₹{order.price} ({order.status})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">You haven't placed any orders yet.</p>
                    )}
                </div>

                {/* Account Details */}
                <div className="bg-white shadow-md p-4 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold">Account Details</h2>
                    <p className="text-gray-600">Trying to find someone</p>
                </div>

                {/* Wallet Section */}
                <div className="bg-white shadow-md p-4 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold flex items-center">
                        <CurrencyRupeeIcon className="w-5 h-5 mr-2" />
                        Your Wallet
                    </h2>
                    <p className="text-gray-600">Your Current Wallet Balance: <span className="font-bold">₹0.00</span></p>

                    <div className="mt-4">
                        <label className="block text-gray-700">Transfer Amount:</label>
                        <input 
                            type="number" 
                            placeholder="Enter amount" 
                            className="border border-gray-300 p-2 w-full rounded-md"
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md flex items-center">
                            <CreditCardIcon className="w-5 h-5 mr-2" /> Transfer
                        </button>
                    </div>
                </div>

                {/* Wallet Actions */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white shadow-md p-4 rounded-lg flex items-center cursor-pointer">
                        <ClockIcon className="w-5 h-5 mr-2 text-blue-500" /> Wallet Transaction History
                    </div>
                    <div className="bg-white shadow-md p-4 rounded-lg flex items-center cursor-pointer">
                        <ClockIcon className="w-5 h-5 mr-2 text-red-500" /> Refund Request
                    </div>
                    <div className="bg-white shadow-md p-4 rounded-lg flex items-center cursor-pointer">
                        <ClockIcon className="w-5 h-5 mr-2 text-green-500" /> Wallet Transfer History
                    </div>
                </div>

                {/* Addresses Section */}
                <div className="bg-white shadow-md p-4 rounded-lg mb-4 flex items-center">
                    <MapIcon className="w-5 h-5 mr-2 text-gray-600" /> View Addresses
                </div>

                {/* WhatsApp Contact */}
                <div className="flex justify-between items-center">
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center">
                        <LogoutIcon className="w-5 h-5 mr-2" /> Log out
                    </button>
                    <a 
                        href="https://wa.me/yourwhatsappnumber" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
                        <PhoneIcon className="w-5 h-5 mr-2" /> Contact on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Account;
