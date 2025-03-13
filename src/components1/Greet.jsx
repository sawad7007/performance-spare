// import React from "react";

import { useState } from "react"

// function greet(){
//   return <div>
//     <h1>hello</h1>
//   </div>
// }

// export default greet;


// import React, { useState } from "react";

// const greet =(props)=>{
//   return <h2>{props.jsx}</h2>
// }



// function counter (){
//   const [count ,setcount]=useState(0)
//   const increment=()=>{
//     setcount(count=> count+1)
//     setcount(count=>count *2)
//   }
//   const decrement=()=>{
//     setcount(count-1)
//   }

//   return (
//     <div>
//       <h3>count :{count}</h3>
//       <button onClick={increment}>increment</button>
//       <button onClick={decrement}>decrement</button>
//     </div>
//   )
// }
// export default counter;


// function counter (){
//   const [user, setuser]=useState({name:'',age:0})

//   const changename =(e)=>{
//     setuser({...user,name :e.target.value})
//   }
//   const changeage=(e)=>{
//     setuser({...user,age:e.target.value})
//   }
//   return(
//     <div>
//       <input type="text" 
//       value={user.name}
//       onChange={changename}/>
//       <input type="number" 
//       value={user.age}
//       onChange={changeage}/>
// <br />
//       <p>{JSON.stringify(user)}</p>
//     </div>
//   )
// }




  // export default counter;



//   import React from "react";

// // Child component
// function Greeting(props) {
//   return <h1>Hello, {props.name}!</h1>;
// }

// // Parent component
// function App() {
//   return (
//     <div>
//       <Greeting name="Savad" />
//       <Greeting name="Ameer" />
//     </div>
//   );
// }

// export default App;


// function Button(props) {
//   return <button onClick={props.clickHandler}>Click Me</button>;
// }

// function App() {
//   const showMessage = () => {
//     alert("Button Clicked!");
//   };

//   return <Button clickHandler={showMessage} />;
// }

// export default App;


// function CarList() {
//   const cars = ["BMW", "Mercedes", "Audi"];

//   return (
//     <ol>
//       {cars.map((car) => (
//         <li>{car}</li>
//       ))}
//     </ol>
//   );
// }

// export default CarList;

import React,{useState} from "react";

const Greet = ()=>{
  const [name,setName]= useState('sawad');


  return (
    <div>
      <h4>hi {name}</h4>
      <button onClick={()=> setName('')}>reset</button>
    </div>
  );

};
export default Greet;