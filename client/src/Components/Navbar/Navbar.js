import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="navbar navbar-expand-lg navbarcss">
      <img src="https://static.vecteezy.com/system/resources/previews/011/161/966/original/fitness-sport-gym-logo-design-vector.jpg" width={"50px"} height={"50px"} className="rounded-circle logo1 mx-2"></img>
      {/* <Link className="navbar-brand" to="/user">Fitness App</Link> */}
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          {isAuthenticated ? (
            <li className="nav-item mt-3">
              {/* <Link className="nav-link" to="/"></Link> */}
              <button 
                className="btn btn-outline-success btn-sm mb-3 mx-3"
                onClick={()=>{
                    window.location.href="/user";
                }}
              >
                <span className="login-text">Home</span>
              </button> 
              <button 
                className="btn btn-outline-success btn-sm mb-3 mx-3"
                onClick={()=>{
                    window.location.href="/user/profile";
                }}
              >
                <span className="login-text">Profile</span>
              </button> 
              <button 
                className="btn btn-outline-success btn-sm mb-3 mx-3"
                onClick={()=>{
                    localStorage.clear();
                    window.location.href="/login";
                }}
              >
                <span className="login-text">Logout</span>
              </button> 
              
            </li>
            
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
