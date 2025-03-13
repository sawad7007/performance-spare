import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: ''});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            navigate('/home');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        
        // Clear error when user starts typing
        if (error) setError('');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        const { name, email, password } = userData;
        
        // Form validation
        if (!name || !email || !password ) {
            setError('All fields are required. Please fill out every field.');
            return;
        }


    
        setLoading(true);
        
        try {
            // Check if email a
            // clready exists
            
            const checkEmailResponse = await axios.get(`http://localhost:3004/users`);
            const users=checkEmailResponse.data;
            const existinguser=users.find(item=>item.email===email)
            if (existinguser) {
                setError('This email is already registered. Please use a different email or login.');
                setLoading(false);
                return;
            }
            
            // Create new user data without confirmPassword
            const newUserData = { 
                name, 
                email, 
                password,
                cart: [],
                createdAt: new Date().toISOString() 
            }; 
    
            // Use port 5001 to be consistent with other components
            const response = await axios.post('http://localhost:3004/users', newUserData);
            
            // Store user data in local storage
            localStorage.setItem('loggedInUser', JSON.stringify(response.data));
            
            // Create empty cart for new user
            localStorage.setItem(`cart_${response.data.id}`, JSON.stringify([]));
            
            // Navigate to home page
            navigate('/home');
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
            setError('Registration failed. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 p-4">
            <div className="p-8 w-full max-w-md bg-white text-black rounded-lg shadow-md border">
                <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={userData.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={loading}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={userData.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={loading}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password (min. 6 characters)"
                            value={userData.password}
                            onChange={handleChange}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={loading}
                        />
                    </div>
                    
                    
                    <button
                        type="submit"
                        className={`w-full p-3 rounded text-white font-medium ${
                            loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
                        } transition`}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                
                <div className="text-center mt-6">
                    <p className="text-gray-600">Already have an account?</p>
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-blue-500 hover:underline mt-1 font-medium"
                        disabled={loading}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;