import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"; 
import { CartProvider } from "./CartContext/CartContext";



ReactDOM.render(<App />, document.getElementById("root"));



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CartProvider>
        <App />
        </CartProvider>
    </React.StrictMode>
);