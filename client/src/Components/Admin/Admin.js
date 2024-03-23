import React from "react";

function Admin ({setAuth}){
    const logout=(e)=>{
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }
    return(
        <div className="container">
            <h1>Admin Page</h1>
            <button className="btn btn-primary mt-5" onClick={e=>logout(e)}>Logout</button>
        </div>
    )  
}

export default Admin;