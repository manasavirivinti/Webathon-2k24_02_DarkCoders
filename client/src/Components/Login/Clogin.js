// import React, { Fragment, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import './Login.css';
// import { newEnforcer } from "casbin";

// const Login = ({ setAuth }) => {
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//   });
//   const { email, password } = inputs;
//   const onChange = (e) => {
//     setInputs({ ...inputs, [e.target.name]: e.target.value });
//   }

//   // Initialize Casbin enforcer
//   const initializeCasbinEnforcer = async () => {
//     const enforcer = await newEnforcer("../server/casbinlogin/casbin-model.conf", "../server/casbinlogin/casbin-policy.csv");
//     return enforcer;
//   };

//   // Check permissions using Casbin enforcer
//   const checkPermission = async (role, path) => {
//     const enforcer = await initializeCasbinEnforcer();
//     return await enforcer.enforce(role, path, "read"); // Assuming "read" permission for login
//   };

//   // On submit form for normal login
//   const onSubmitForm = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await fetch("http://localhost:5000/auth/login", {
//             method: "POST",
//             headers: { "content-Type": "application/json" },
//             body: JSON.stringify(body)
//           });
//           const parseRes = await response.json();
//       const hasPermission = await checkPermission("user", "/user"); // Check permission for user page
//       if (parseRes.token && hasPermission) {
//         setAuth(true);
//         window.location.href = "/user"; // Redirect to user page
//       } else {
//         setAuth(false);
//       }
//     } catch (err) {
//       console.error(err.message);
//     }
//   }

//   return (
//     <Fragment>
//       <div className="container">
//         <h1 className="text-center my-5">Login</h1>
//         <form onSubmit={onSubmitForm}>
//           <input
//             type="email"
//             name="email"
//             placeholder="email"
//             className="form-control my-3"
//             value={email}
//             onChange={onChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="password"
//             className="form-control my-3"
//             value={password}
//             onChange={onChange}
//             required
//           />
//           <button className="btn btn-success btn-block">Submit</button>
//         </form>
//       </div>
//       <div className="mt-5 text-center">
//         <Link to="/register">New User ..? then Register</Link>
//       </div>
//     </Fragment>
//   );
// };

// export default Login;
