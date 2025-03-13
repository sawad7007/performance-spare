// import React, { Component } from "react";

// export default class forms extends Component {
//   state = {
//     firstName: "",
//     lastName: "",
//   };
//   onHandleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   onsubmit = () => {
//     console.log(this.state);
//   };

//   render() {
//     return (
//       <form>
//         <h2>form component</h2>
//         <input
//           type="text"
//           name="firstName"
//           value={this.state.firstName}
//           onChange={this.onHandleChange}
//         />

//         <input
//           type="text"
//           name="lastName"
//           value={this.state.lastName}
//           onChange={this.onHandleChange}
//         />

//         <button type="button" onClick={this.onsubmit}>
//           submit
//         </button>
//       </form>
//     );
//   }
// }
