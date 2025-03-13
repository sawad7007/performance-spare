// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const { createContext } = require("react");

// const CarList = () => {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
      
//     axios.get("http://localhost:5000/cars")
//       .then(response => {
//         setCars(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Car List</h2>
//       <ul>
//         {cars.map(car => (
//           <li key={car.id}>{car.brand} {car.model} ({car.year})</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CarList;


