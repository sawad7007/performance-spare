import React, { createContext, useState, useEffect, useRef, useCallback, useMemo } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = React.memo(({ children }) => {
    const [cart, setCart] = useState([]);
    const isInitialMount = useRef(true);
    const lastUpdatedCart = useRef([]);

    // 🟢 Fetch cart from DB on login
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
                if (!loggedInUser) return;

                const response = await axios.get(`http://localhost:3004/users/${loggedInUser.id}`);
                if (response.data && response.data.cart) {
                    setCart(response.data.cart);
                    lastUpdatedCart.current = response.data.cart;
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

        if (JSON.stringify(cart) === JSON.stringify(lastUpdatedCart.current)) return;

        const updateCartInDB = async () => {
            try {
                const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
                if (!loggedInUser) return;

                await axios.patch(`http://localhost:3004/users/${loggedInUser.id}`, { cart });
                lastUpdatedCart.current = cart;
            } catch (error) {
                console.error("Error updating cart:", error);
            }
        };

        const debounceTimer = setTimeout(updateCartInDB, 1000);
        return () => clearTimeout(debounceTimer);
    }, [cart]);

    // 🟢 Optimized functions with useCallback
    const addToCart = useCallback((product) => {
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
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    }, []);

    const increaseQuantity = useCallback((productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }, []);

    const decreaseQuantity = useCallback((productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    }, []);

    const clearCartOnLogout = useCallback(async () => {
        try {
            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if (loggedInUser) {
                await axios.patch(`http://localhost:3004/users/${loggedInUser.id}`, { cart: [] });
            }
            setCart([]);
        } catch (error) {
            console.error("Error clearing cart on logout:", error);
        }
    }, []);

    // 🟢 Memoized context value to prevent unnecessary re-renders
    const cartContextValue = useMemo(() => ({
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCartOnLogout,
    }), [cart]);

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
});