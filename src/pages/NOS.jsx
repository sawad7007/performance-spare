
import React,{useState,useEffect,useContext} from "react";
import { CartContext } from "../CartContext/CartContext";
import Navbar from "./Navbar";
import Footer from "./footer";
const NOS = () => {
    const [nos, setNose] = useState([]);
    const {cart, setCart} = useContext(CartContext);

    useEffect(() => {
        fetch('http://localhost:3004/nos') 
            .then(response => response.json())
            .then(data => setNose(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);
    

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
    
        if (existingProduct) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 } // Quantity increase cheyyunnu
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]); // Product add cheyyumbol quantity 1 aakanam
        }
    
        alert("Product added");
    };
    return(
        <div>


        <Navbar/>
         {/* Products Section */}
         <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         {nos.map((product) => (
             <div key={product.id} className="border rounded-lg p-4 shadow-md">
                 <img src={product.image} alt={product.name} className="w-full h-55 object-cover rounded-md" />
                 <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                 <p className="text-gray-600">{product.description}</p>
                 <p className="text-green-500 font-bold mt-1">${product.price}</p>
                 
                 <button 
                     onClick={() => addToCart(product)} 
                     className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full hover:bg-blue-600">
                     Add to Cart
                 </button>

             </div>
         ))}
     </div>
     <Footer/>


     </div>
); 
    
};

export default NOS;