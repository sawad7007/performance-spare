// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Products() {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios.get('http://localhost:3001/products')
//             .then((response) => {
//                 setProducts(response.data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 setError('Error fetching data');
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div>
//             <h1>Products</h1>
//             {products.map((product) => (
//                 <div key={product.id}>
//                     <h3>{product.name}</h3>
//                     <p>₹{product.price}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Products;
