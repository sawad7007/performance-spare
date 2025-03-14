import React, { useContext } from 'react';
import { CartContext } from '../CartContext/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);
    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];

    // Filter selected items from the cart
    const filteredCart = cart.filter(item => selectedItems.includes(item.id));

    const getTotalPrice = () => {
        return filteredCart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleOrderConfirm = () => {
        navigate('/address');
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            {filteredCart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {filteredCart.map(item => (
                        <div key={item.id} className="border p-4 mb-2 rounded-md flex gap-4">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                            <div>
                                <h3 className="text-lg font-bold">{item.name}</h3>
                                <p className="text-green-500 font-bold">${item.price} x {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                    <h3 className="text-xl font-bold mt-4">Total: ${getTotalPrice()}</h3>

                    <div className="flex justify-between mt-4">
                        <button 
                            onClick={handleOrderConfirm} 
                            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 mt-4"
                        >
                            Confirm Order
                        </button>

                        <button onClick={() => navigate("/cart")}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 mt-4"
                        >
                            Back to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfirmOrder;
