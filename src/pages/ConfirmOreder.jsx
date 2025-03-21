import React, { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useContext(CartContext);
    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];

    // Filter selected items from the cart
    const filteredCart = cart.filter(item => selectedItems.includes(item.id));

    // Calculate Total Price
    const getTotalPrice = () => {
        return filteredCart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Function to update sales database
    const updateSales = async (filteredCart) => {
        try {
            for (const item of filteredCart) {
                const response = await fetch(`http://localhost:3004/sales/${item.id}`);
                
                if (response.ok) {
                    // Product already exists in sales, update it
                    const salesData = await response.json();
                    const updatedSales = {
                        ...salesData,
                        sales: salesData.sales + (item.price * item.quantity) // Update sales amount
                    };
    
                    await fetch(`http://localhost:3004/sales/${item.id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedSales),
                    });
    
                    console.log(`Sales updated for item ${item.id}`);
                } else {
                    // New product, add it to sales
                    const newSalesEntry = {
                        id: item.id,
                        name: item.name,
                        sales: item.price * item.quantity
                    };
    
                    await fetch("http://localhost:3004/sales", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newSalesEntry),
                    });
    
                    console.log(`New sales entry added for item ${item.id}`);
                }
            }
        } catch (error) {
            console.error("Error updating sales:", error);
        }
    };
    

    // Function to update stats
    const updateStats = async (newSales) => {
        try {
            const response = await fetch("http://localhost:3004/stats");
            if (!response.ok) throw new Error("Stats fetch failed!");

            const statsData = await response.json();
            const currentStats = statsData[0];

            if (!currentStats) {
                console.error("Stats entry not found!");
                return;
            }

            const updatedStats = {
                ...currentStats,
                totalSales: currentStats.totalSales + newSales,
                totalOrders: currentStats.totalOrders + 1
            };

            await fetch(`http://localhost:3004/stats/${currentStats.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedStats),
            });

            console.log("Stats updated successfully!");
        } catch (error) {
            console.error("Error updating stats:", error);
        }
    };

    const handleOrderConfirm = async () => {
        await updateSales(filteredCart);  
    
        const newSalesAmount = filteredCart.reduce((total, item) => total + (item.price * item.quantity), 0);
        await updateStats(newSalesAmount);
    
        await updateOrders(filteredCart); // Orders DB-il add cheyyan ithu call cheyyanam
    
        filteredCart.forEach(item => removeFromCart(item.id));
        navigate("/confirmation", { state: { orderedItems: filteredCart } });
    };
    




    // Function to update orders database
const updateOrders = async (filteredCart) => {
    try {
        const orderData = {
            items: filteredCart,
            totalAmount: getTotalPrice(),
            date: new Date().toISOString()
        };

        const response = await fetch("http://localhost:3004/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) throw new Error("Failed to add order!");

        console.log("Order added successfully!");
    } catch (error) {
        console.error("Error adding order:", error);
    }
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
