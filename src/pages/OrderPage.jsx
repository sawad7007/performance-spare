import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import axios from "axios";

const OrderPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const [detailedCart, setDetailedCart] = useState([]);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await Promise.all(
          cart.map(async (item) => {
            const response = await axios.get(`http://localhost:3004/products/${item.id}`);
            return { ...response.data, quantity: item.quantity };
          })
        );
        setDetailedCart(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    if (cart.length > 0) fetchProductDetails();
  }, [cart]);

  const totalAmount = detailedCart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    setSuccess(true);
    setTimeout(() => {
      setCart([]); // Empty the cart after order confirmation
      navigate("/"); // Navigate to home page
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Order Summary</h2>
        {success ? (
          <p className="text-green-600 text-center font-bold">Order confirmed! ✅ Redirecting...</p>
        ) : (
          <div>
            <ul className="mb-4">
              {detailedCart.map((item) => (
                <li key={item.id} className="flex flex-col border-b py-2">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <span className="font-semibold">{item.name} (x{item.quantity})</span>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <span className="ml-auto">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-lg font-semibold flex justify-between mb-4">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <button
              onClick={handleConfirmOrder}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;