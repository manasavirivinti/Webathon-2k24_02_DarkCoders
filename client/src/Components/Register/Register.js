import React, { Fragment, useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import videoplay from './video.mp4';
import './Register.css';
const CLIENT_ID="1ffe90f1710c8433e834";

const Register=({setAuth })=>{
    const [inputs,setInputs]=useState({
        email:"",
        password:"",
        name:""
    })
    const [user,setUser]=useState({});
    const {email,password,name}=inputs;
    const [error,setError]=useState(null);
    const onChange=(e)=>{
        setInputs({...inputs,[e.target.name]
        : e.target.value});
    }


    //normal registration
    const onSubmitForm= async e=>{
        e.preventDefault();
        try {
            const user_email=email;
            const user_name=name;
            const user_password=password;
            const body={user_email,user_password,user_name};
            const response=await fetch("http://localhost:5000/auth/register",{
                method:"POST",
                headers:{"content-Type":"application/json"}
                ,
                body:JSON.stringify(body)
            });
            // console.log(body);
            const parseRes=await response.json();
            localStorage.setItem("token", parseRes.token);
            console.log(parseRes.token);
            if(parseRes.token){
                setAuth(true);
                const role = parseRes.role;
                if (role === 'ADMIN') {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/user";
                }
            }
            else{
                setAuth(false);
                setError(parseRes.error);
            }
                
        } catch (err) {
            console.error(err.message);
        }
    }


     //google oauth

    function handleCallBackResponse(response){
        console.log("encoded JWT id token :"+response.credential);
        const obj=response.credential;
        const decoded=jwtDecode(obj);
        console.log(decoded);
        setUser(decoded);
        document.getElementById("signInDiv").hidden=true;
        
        //posting details to backend route
        const {email,name}=decoded;
        const user_email=email;
        const user_password=name;
        const user_name=name;
        const body={user_email,user_password,user_name};
        fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
        })
        .then(response => response.json())
        .then(parseRes => {
            console.log(parseRes);
            console.log(body);
            localStorage.setItem("token", parseRes.token);
            localStorage.setItem("username", parseRes.user_name);
            console.log(parseRes.token);
            console.log(parseRes.user_name);
            setAuth(true);
            const role = parseRes.role;
            if (role === 'ADMIN') {
                window.location.href = "/admin";
            } else {
                window.location.href = "/user";
            }
        })
        .catch(error => {
            console.error("Error posting user details:", error);
            setAuth(false);
        });
        
    }
    useEffect(()=>{
            const googleSignInInit = async ()=>{
                // eslint-disable-next-line no-undef
                await google.accounts.id.initialize({
                    client_id: "726221733347-a05g5o8k9ev8fj0eofb0nt9s3k4b8lms.apps.googleusercontent.com",
                    callback: handleCallBackResponse
                });
                // eslint-disable-next-line no-undef
                await google.accounts.id.renderButton(
                    document.getElementById("signInDiv"),
                    {theme :"outline",size:"large"}
                );
                // eslint-disable-next-line no-undef
                await google.accounts.id.prompt();
                ;}
            googleSignInInit();
            return ()=>{
                const signInDiv=document.getElementById("signInDiv");
                if(signInDiv){
                    signInDiv.innerHTML="";
                }
            };
    },[]);
   function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden=false;
   }


   



     return(
        <Fragment>
            <div className="video-background">
            <video src={videoplay} autoPlay loop muted type='video/mp4' />
                <div className="content">
                    <div className="container">
                <h1 className="text-center my-5">Register</h1>
                <form onSubmit={onSubmitForm}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="email" 
                        className="form-control my-3"
                        value={email}
                        onChange={e=>onChange(e)}
                        required
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="password" 
                        className="form-control my-3"
                        value={password}
                        onChange={e=>onChange(e)}
                        required
                    />
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="name" 
                        className="form-control my-3"
                        value={name}
                        onChange={e=>onChange(e)}
                        required
                    />
                    <button className="btn btn-secondary btn-block">Submit</button>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                <div className="mt-5 text-center">
                    <Link to="/login" style={{color:"white",fontWeight:'bolder'}}>Already registered ...? then Login</Link>
                </div>
                <div id="signInDiv" ></div>
                
                
                    </div>
                </div>
            </div>
            
        </Fragment>
     );
};

export default Register;