import React, { Fragment, useState,useEffect } from "react";
import {Link} from "react-router-dom";
import './Login.css';
import {jwtDecode} from "jwt-decode";
import videoplay from './video.mp4';
import img1 from './GitHub-Logo.png';


const CLIENT_ID="1ffe90f1710c8433e834";

const Login=({setAuth })=>{
     const [rerender,setRerender]=useState(false);
    const [user,setUser]=useState({});
    const [inputs,setInputs]=useState({
        email:"",
        password:"",
    })
    const [error,setError]=useState(null);
    const {email,password}=inputs;
    const onChange=(e)=>{
        setInputs({...inputs,[e.target.name]
        : e.target.value});
    }
    // on submit form for normal login
    const onSubmitForm= async e=>{
        e.preventDefault();
        try {
            const user_email=email;
            const user_password=password;
            const body={user_email,user_password};
            const response=await fetch("http://localhost:5000/auth/login",{
                method:"POST",
                headers:{"content-Type":"application/json"}
                ,
                body:JSON.stringify(body)
            });
            // console.log(body);
            const parseRes=await response.json();
            // console.log(parseRes);
            const role=parseRes.role;
            localStorage.setItem("token",parseRes.token)
            if(parseRes.token){
                setAuth(true);
                if(role === 'ADMIN'){
                    window.location.href="/admin";
                    
                  }
                  else{
                    window.location.href="/user";
                     
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
    // document.getElementById("signInDiv").hidden=true;
    
    //posting details to backend route
    const {email,given_name}=decoded;
    const body={
        user_email:email,
        user_password:given_name
    };
    fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
        
    })
    .then(response => response.json())
    .then(parseRes => {
        // console.log(parseRes);
        // console.log(body);
        localStorage.setItem("token", parseRes.token);
        // console.log(parseRes.token);
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
        //  eslint-disable-next-line no-undef
    google.accounts.id.initialize({
      client_id: "726221733347-a05g5o8k9ev8fj0eofb0nt9s3k4b8lms.apps.googleusercontent.com",
      callback: handleCallBackResponse
    });
        //   eslint-disable-next-line no-undef
    google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme :"outline",size:"large",login_hint:null}
    );
    //   eslint-disable-next-line no-undef
    google.accounts.id.prompt();

},[]);
   function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden=false;
   }

//GITHUB OAUTH

useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    if (codeParam && localStorage.getItem("accessToken") === null) {
        async function getAccessToken() {
            try {
                const response = await fetch("http://localhost:5000/getAccessToken?code=" + codeParam, {
                    method: "GET"
                });
                const data = await response.json();
                if (data.access_token) {
                    localStorage.setItem("accessToken", data.access_token);
                    // Post user details to backend login route
                    const gitresponse = await fetch("https://api.github.com/user",{
                        method:"GET",
                        headers:{
                            "Authorization":`token ${data.access_token}`
                        }
                    });
                    const userdata=await gitresponse.json();
                    console.log(userdata);
                    const body={
                        user_email:userdata.login + '@gmail.com',
                        user_password:"github",
                        // user_name:userdata.login
                    };
                    console.log(body);
                    const loginResponse = await fetch("http://localhost:5000/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    });
                    const parseRes = await loginResponse.json();
                    console.log(parseRes);
                    // if user is newly logging in then register
                    //else log in
                    if(parseRes === 'missing credentials'){
                        const body={
                            user_email:userdata.login + '@gmail.com',
                            user_password:"github",
                             user_name:userdata.login
                        };
                        console.log(body);
                        const loginResponse = await fetch("http://localhost:5000/auth/register", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                        });
                        const parseRes = await loginResponse.json();
                        localStorage.setItem("token",parseRes.token);
                        const role=parseRes.role;
                        if(role==='ADMIN'){
                            window.location.href="/admin"
                        }
                        else{
                            window.location.href="/user";
                        }
                    }else{
                        localStorage.setItem("token", parseRes.token);
                    
                        // setAuth(true); // Set authentication to true
                        const role = parseRes.role;
                        console.log(role);
                        if (role === 'ADMIN') {
                            window.location.href = "/admin";
                        } else {
                            setAuth(true);
                            window.location.href = "/user";
                            
                        }
                    }
                    
                }
                else{
                    console.error("No access token received from github");
                    setAuth(false);
                }
            } catch (error) {
                console.error("Error getting access token:", error);
                setAuth(false); 
            }
        }
        getAccessToken();
    }
}, [setAuth]);

   
   const githublogin=()=>{
    localStorage.removeItem("accessToken");
    setAuth(false);
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
        + "&prompt=select_account");
   };

   //twitter oath
   
    
     return(
        <Fragment>
            <div className="d-flex justify-content-center">
                
                <div className="video-background">
                    <video src={videoplay} autoPlay loop muted type='video/mp4' />
                    <div className="content">
                        <div className="container">
                            <div className="row justify-content-md-center mt-5" >
                                
                            <h1 className="text-center mt-2" style={{fontWeight:"bolder"}}>Login</h1>
                                <div className="col-md-6 b1 my-2">
                                    <h3 className=" my-3 " style={{color:'black',fontWeight:'bolder'}}>Enter your credentials</h3>
                                    <form onSubmit={onSubmitForm}>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className="form-control my-3"
                                            value={email}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className="form-control my-3"
                                            value={password}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                        <button className="btn btn-secondary btn-block" style={{fontWeight:"bolder"}}>Submit</button>
                                    </form>
                                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                                </div>
                                <div className="col-md-6 text-center b2" >
                                    <h3 className="text-center my-3" style={{color:'black',fontWeight:'bolder'}}>Using gmail or github</h3>
                                    <div id="signInDiv"></div>
                                    <div>
                                        <button onClick={githublogin} className="btn btn-secondary mt-5" style={{fontWeight:"bolder"}}>
                                            <img src="https://logos-world.net/wp-content/uploads/2020/11/GitHub-Symbol.png" width={"60px"} height={"30px"}></img>
                                            GitHub Login</button>
                                    </div>
                                    
                                </div>
                                <div className="container mt-4">
                                    <Link to="/register"  style={{color:"whitesmoke",fontSize:'30px',fontWeight:"bolder",textShadow:'5px 5px 5px 50px white'}}>New User ..? then Register</Link>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
            
            </div>
            
        </Fragment>
     );
};

export default Login;
