import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { CartContext } from '../CartContext/CartContext';
import ImageSlider from './Imageslider';
import CarParts from './CarParts';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const { cart, setCart } = useContext(CartContext);
    
    useEffect(() => {
        fetch('http://localhost:3004/products')
            .then(response => response.json())
            .then(data => setProducts(data))
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
    
    return (
        <div className="min-h-screen">
            <Navbar cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
            <ImageSlider />
            
            {/* Main Full Banner */}
            <div className="max-w-[98%] mx-auto p-2 relative">
                <div
                    className="w-full h-[65vh] bg-cover bg-center rounded-lg shadow-lg relative"
                    style={{
                        backgroundImage: "url('https://s1.cdn.autoevolution.com/images/news/new-bmw-m-performance-parts-for-the-m4-introduced-at-sema-2015-including-cfrp-wing-photo-gallery-101628_1.jpg')"
                    }}
                >
                    <div className="absolute bottom-80 left-4 text-white text-3xl font-bold p-3 rounded-md">
                        Performance Accessories
                    </div>
                </div>
            </div>
            
            {/* Two Equal Banners */}
            <div className="grid grid-cols-2 gap-4 p-4">
                <div className="h-[40vh] bg-cover bg-center rounded-lg shadow-lg"
                    style={{ backgroundImage: "url('https://liftkit.imgix.net/blog/az1001/images/featured-image-10620.png')" }}>
                </div>
                
                <div className="h-[40vh] bg-cover bg-center rounded-lg shadow-lg"
                    style={{ backgroundImage: "url('https://vorshlag-store.com/cdn/shop/products/B61G2881_v2-XL_4701994c-f1e4-4085-9b2f-65aba3a258ad_2000x.jpg?v=1478553696')" }}>
                </div>
            </div>
            
            {/* Products Section */}
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 shadow-md">
                        <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md" />
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
            <CarParts />
        </div>
    );
};

export default HomePage;