import React, { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const isInitialMount = useRef(true);
    const lastUpdatedCart = useRef([]); // 🛑 Prevents duplicate updates

    // 🟢 Fetch cart from DB on login
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
                if (!loggedInUser) return;

                const response = await axios.get(`http://localhost:3004/users/${loggedInUser.id}`);
                if (response.data && response.data.cart) {
                    setCart(response.data.cart);
                    lastUpdatedCart.current = response.data.cart; // Store initial cart to prevent redundant updates
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, []);

    // 🟢 Update cart in DB whenever cart changes
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Prevent duplicate API calls if cart is same as last updated cart
        if (JSON.stringify(cart) === JSON.stringify(lastUpdatedCart.current)) return;

        const updateCartInDB = async () => {
            try {
                const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
                if (!loggedInUser) return;

                await axios.patch(`http://localhost:3004/users/${loggedInUser.id}`, { cart });
                lastUpdatedCart.current = cart; // Update lastUpdatedCart reference
            } catch (error) {
                console.error("Error updating cart:", error);
            }
        };

        const debounceTimer = setTimeout(updateCartInDB, 1000); // 🔥 Only updates after 1 sec (prevents frequent calls)

        return () => clearTimeout(debounceTimer);
    }, [cart]);

    // 🟢 Add product to cart & POST to DB
    const addToCart = (product) => {
        if (!product || !product.id) {
            console.error("Invalid product:", product);
            return;
        }

        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // 🟢 Remove product from cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    // 🟢 Increase product quantity
    const increaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // 🟢 Decrease product quantity
    const decreaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // 🟢 Clear cart on logout
    const clearCartOnLogout = async () => {
        try {
            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if (loggedInUser) {
                await axios.patch(`http://localhost:3004/users/${loggedInUser.id}`, { cart: [] });
            }

            setCart([]);
        } catch (error) {
            console.error("Error clearing cart on logout:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCartOnLogout,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
