import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const CartDisplay = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectItem = (itemId) => {
        setSelectedItems(prevSelected => 
            prevSelected.includes(itemId) 
                ? prevSelected.filter(id => id !== itemId) 
                : [...prevSelected, itemId]
        );
    };

    return (
        <div>
            <Navbar/>
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                cart.map(item => (
                    <div key={item.id} className="border p-4 mb-2 rounded-md flex gap-4">
                        <input 
                            type="checkbox" 
                            checked={selectedItems.includes(item.id)} 
                            onChange={() => handleSelectItem(item.id)}
                            className="w-5 h-5"
                        />
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md"/>
                        <div>
                            <h3 className="text-lg font-bold">{item.name}</h3>
                            <p>{item.description}</p>
                            <p className="text-green-500 font-bold">${item.price}</p>
                            <p>Quantity: {item.quantity}</p>

                            <div className="flex gap-2 mt-2">
                                <button 
                                    onClick={() => increaseQuantity(item.id)}
                                    className="bg-green-500 text-white px-2 py-1 rounded-md">
                                    ➕
                                </button>
                                <button 
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded-md">
                                    ➖
                                </button>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-md">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
            
            <div className="flex justify-between mt-4">
                <button 
                    onClick={() => navigate("/")} 
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
                >
                    Shop More
                </button>

                {selectedItems.length > 0 && (
                    <button 
                        onClick={() => navigate("/confirm", { state: { selectedItems } })} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
                    >
                        Confirm Order
                    </button>
                )}
            </div>
        </div>
        </div>
    );
};

export default CartDisplay;
