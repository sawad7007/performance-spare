import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../NavbarContext/NavbarContext';
import { ShoppingCartIcon } from '@heroicons/react/outline';

const Navbar = ({ cartCount }) => {
    const { isLoggedIn, login, logout } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Check if user is logged in by checking localStorage
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            login(); // Call login function to update context state
        } else {
            logout(); // If no user is logged in, ensure logout is called
        }
    }, [login, logout]);

    const handleLogout = () => {
        // Get user data before removing from localStorage
        const userData = localStorage.getItem('loggedInUser');
        let userId = null;
        
        if (userData) {
            try {
                userId = JSON.parse(userData)?.id;
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
        
        // Remove the logged-in user data from localStorage
        localStorage.removeItem('loggedInUser');

        // Also, remove the user's cart data (if stored separately)
        if (userId) {
            const userCartKey = `cart_${userId}`;
            localStorage.removeItem(userCartKey);
        }

        // Update the context to reflect logout
        logout();

      
      
    };

    const handleNavigation = (page) => {
        const route = `/${page.toLowerCase().replace(/ /g, '-')}`;
        navigate(route);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const productCategories = [
        "Home", "Wheels", "Engine", "Exhaust Systems", 
        "Brakes", "Accessories", "Tools", "Turbocharger", "NOS"
    ];

    const filteredCategories = productCategories.filter(category =>
        category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="flex justify-between items-center mb-4 relative">
                <div className="text-2xl font-bold text-blue-500">Amri Automotive</div>

                <div className="flex-grow mx-4 relative">
                    <input 
                        type="text" 
                        placeholder="Search for products..." 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {searchQuery && (
                        <ul className="absolute bg-white shadow-md w-full mt-1 max-h-40 overflow-y-auto z-10">
                            {filteredCategories.map((category, index) => (
                                <li 
                                    key={index} 
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleNavigation(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <button 
                            onClick={() => navigate("/login")} 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Login
                        </button>
                    )}

                    <div 
                        className="relative cursor-pointer"
                        onClick={() => navigate("/cart")}
                    >
                        <ShoppingCartIcon className="w-6 h-6 text-blue-500" />
                        {cartCount > 0 && (
                            <span 
                                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-center space-x-16 text-gray-600 text-sm">
                {productCategories.map((item) => (
                    <span 
                        key={item} 
                        className="cursor-pointer hover:text-blue-500 transition duration-300"
                        onClick={() => handleNavigation(item)}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;