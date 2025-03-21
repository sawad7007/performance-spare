// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { CartContext } from "../CartContext/CartContext"; // Ensure correct import

// const PaymentPage = () => {
// //   const { setCart } = useContext(CartContext); // Using the context
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [name, setName] = useState("");
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handlePayment = (e) => {
//     e.preventDefault();
//     setSuccess(true);
//     setTimeout(() => {
//       navigate("/order");
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center mb-4">Payment Details</h2>
//         {success ? (
//           <p className="text-green-600 text-center font-bold">Order confirmed! ✅ Redirecting...</p>
//         ) : (
//           <form onSubmit={handlePayment} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Cardholder Name</label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Card Number</label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded"
//                 placeholder="1234 5678 9012 3456"
//                 value={cardNumber}
//                 onChange={(e) => setCardNumber(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="flex space-x-4">
//               <div className="w-1/2">
//                 <label className="block text-sm font-medium">Expiry Date</label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded"
//                   placeholder="MM/YY"
//                   value={expiry}
//                   onChange={(e) => setExpiry(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="w-1/2">
//                 <label className="block text-sm font-medium">CVV</label>
//                 <input
//                   type="password"
//                   className="w-full p-2 border rounded"
//                   placeholder="***"
//                   value={cvv}
//                   onChange={(e) => setCvv(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//             >
//               Pay Now
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;














  // "orders": [
  //   {
  //     "id": "d730",
  //     "items": [
  //       {
  //         "id": "1",
  //         "name": "BBS CH-R",
  //         "description": "Lightweight performance wheel with a sleek design",
  //         "price": 2000,
  //         "image": "https://cncwheels.com.au/wp-content/uploads/2023/01/Racing_Wheels_Flow_Form_JSR_ST37_Dark_Bronze_Machined_Lip_Japan_JDM_Rims_18_19_inch_white_sticker.jpg",
  //         "quantity": 1
  //       }
  //     ],
  //     "totalAmount": "2000.00",
  //     "date": "2025-03-21T05:53:30.073Z"
  //   },
  //   {
  //     "id": "0a5e",
  //     "items": [
  //       {
  //         "id": "1",
  //         "name": "Brembo GT Brake Kit",
  //         "description": "High-performance brake kit for sports cars",
  //         "price": 500,
  //         "image": "https://assets.turnermotorsport.com/product_library_tms/1534196_x800.webp",
  //         "quantity": 1
  //       }
  //     ],
  //     "totalAmount": "500.00",
  //     "date": "2025-03-21T06:25:13.479Z"
  //   }
  // ],