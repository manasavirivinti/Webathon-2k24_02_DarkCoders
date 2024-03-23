import React, { useState, useEffect } from "react";
import videoplay from './video.mp4';
import './User.css';
// import { Outlet } from "react-router-dom";
// import UserSidebar from "./UserSidebar/UserSidebar";
const User = ({ setAuth }) => {
    const [userData, setUserData] = useState({});
    const [showUserData, setShowUserData] = useState(false);
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        setAuth(false);
    };

    const getUserData = async () => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            try {
                const response = await fetch("http://localhost:5000/getdata", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + accessToken
                    }
                });
                const data = await response.json();
                setUserData(data);
                setShowUserData(true);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        } else {
            setUserData({});
            setShowUserData(false);
        }
    };
    
    const toggleUserData = () => {
        if (showUserData) {
            setUserData({});
            setShowUserData(false);
        } else {
            getUserData();
        }
    };
    const handleQuiz=()=>{
      window.location.href="/user/quiz";
    }
    const handletrack=()=>{
      window.location.href="/user/tracking";
    }
    const handleExercises=()=>{
      window.location.href="/user/exercises";
    }

    return (
        
        <div className="video-background videoplay">
            <video src={videoplay} autoPlay loop muted type='video/mp4' />
            <div className="content mt-5">
                <div className="container text-center mt-5">
                <h1 style={{color:"black",fontWeight:"bolder"}}>Healthify</h1>
                {localStorage.getItem("accessToken") && (
                    <>
                        
                        <button onClick={toggleUserData} className="btn btn-secondary mt-2">Click to get user details</button>
                        {showUserData && Object.keys(userData).length !== 0 && (
                            <>
                                <h4>User Name is {userData.login}</h4>
                                <img width="100px" height="100px" src={userData.avatar_url} alt="User avatar"></img>
                                <br />
                                <a href={userData.html_url}>Link to profile</a>
                            </>
                        )}
                        <br />
                        
                    </>
                )}
                {/* <button onClick={logout} className="btn btn-danger mt-4">Log out</button> */}
                {/* <UserSidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"}/> */}
                {/* <div id="page-wrap" >
                <Outlet />
                </div> */}
                <div className="d-flex justify-content mt-5"> {/* Flexbox container */}
                {/* card1 */}
                <div className="card logcard mx-3">
                <div className="card-body"> {/* New container for content */}
                    <p style={{fontSize:"20px",fontWeight:"bold"}}>Get Personalised Recommendations</p>
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/000/639/199/original/q-a-symbol-question-answer-icon-vector.jpg"
                      width={"150px"}
                      height={"130px"}
                      alt="Diet"
                    />
                  </div>
                  <div className="card-footer"> {/* New container for button */}
                    <button className="btn btn-success" onClick={handleQuiz}>
                      Let us know your health status
                    </button>
                  </div>
                </div>
                <div className="card logcard mx-3">
                <div className="card-body"> {/* New container for content */}
                    <p style={{fontWeight:"bold",fontSize:"20px"}}>Track your Progress</p>
                    <img
                      src="https://thegadgetflow.com/wp-content/uploads/2016/01/Atlas-----The-Ultimate-Fitness-Tracking-Wearable-04.jpg"
                      width={"150px"}
                      height={"130px"}
                      alt="Diet"
                    />
                  </div>
                  <div className="card-footer"> {/* New container for button */}
                    <button className="btn btn-success" onClick={handletrack}>
                      Fitness Tracking
                    </button>
                  </div>
                </div>
                <div className="card logcard mx-3">
                <div className="card-body"> {/* New container for content */}
                    <p style={{fontSize:"20px",fontWeight:"bold"}}>Explore</p>
                    <img
                      src="https://tse2.mm.bing.net/th?id=OIP.PO7HwGpHbnd3dA0w6JUaHAHaFj&pid=Api&P=0&h=220"
                      width={"170px"}
                      height={"150px"}
                      alt="Diet"
                    />
                  </div>
                  <div className="card-footer"> {/* New container for button */}
                    <button className="btn btn-success" onClick={handleExercises}>
                      Exercises
                    </button>
                  </div>
                </div>
                
              </div>
                </div>
                
                
            </div>
            
        </div>
        
    );
};

export default User;
