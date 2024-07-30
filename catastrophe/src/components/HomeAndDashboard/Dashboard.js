import React from 'react'
import axios from 'axios';
import UserList from '../UserAndList/UserList'
import user from '../../images/user.jpeg'
import { useNavigate,useLocation } from 'react-router-dom';
import { useContext ,useState } from 'react';
import { autheticator } from '../context/Usercontext';
function Dashboard() {
  const {loginStatus,setLoginStatus}=useContext(autheticator);
  const {userName,setUser}=useContext(autheticator);
  const {uType,setUType}=useContext(autheticator)
  const{uData,setUData}=useContext(autheticator);
  const navigate = useNavigate()
  const location = useLocation()
  const handleProfileClick = async () => {
    try {
      const url = `http://localhost:4000/${uType}/get_userdetails/${userName}`;
      const response = await axios.get(url);
      const userdata = await response.data;
      console.log("Retrieved userdata:", userdata);
      setUData(userdata);
      if (userdata) {
        navigate('/profile', { state:  userdata});
      } else {
        alert("No user data retrieved.");
      }
    } catch (error) {
     alert("Error fetching user details:", error)
    }
  };
  
  const handleLogout=()=>{
    setLoginStatus(false)
    setUser(null)
    setUType(null)
    navigate('/login')
  }
  return (

    <div >
      <div className='d-flex justify-content-between'>
      <p className='display-6 text-start text-info fS-2'>Welcome  {userName}! </p>
      <div className='d-flex flex-column justify-content-between'>
        <div className=" card text-center mt-2 b-2 " onClick={handleProfileClick}>
          <div className='d-flex justify-content-center align-items-center'>
          <img src={uData.profilePhoto||user} className="rounded-circle" alt="Profile" style={{ width: '50px', height: '50px', textAlign: "center" }} />
          </div>
          <p className=' text-end text-info fS-2'>View & Edit Your Profile</p>
        </div>
        <button className='btn btn-primary mt-2' onClick={handleLogout}>Logout</button>
      </div>
      </div>


      <UserList />
    </div>
  )
}


export default Dashboard