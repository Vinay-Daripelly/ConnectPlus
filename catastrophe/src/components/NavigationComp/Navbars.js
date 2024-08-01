import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigationcomp.css';
import { autheticator } from '../context/Usercontext';
import { useContext } from 'react';
function Navbars() {
  const {loginStatus,setLoginStatus}=useContext(autheticator);
  return (
    <div className="d-flex justify-content-between align-items-center">
      <li className="nav-item" type="none">
        <h2 ><i>Connect Plus</i></h2>
      </li>
      <ul className="nav">
        
        {
          !loginStatus ? <>
          <li className="nav-item">
          <NavLink className="nav-link" to="">Home</NavLink>
        </li>
            <li className="nav-item ml-auto">
              <NavLink className="nav-link" to="signup">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="Login">Login</NavLink>
            </li>
          </>
            :
            <>
              <li className="nav-item ml-auto">
                <NavLink className="nav-link" to="dashboard">Dashboard</NavLink>
              </li>
            </>
        }

      </ul>
    </div>
  );
}

export default Navbars;
