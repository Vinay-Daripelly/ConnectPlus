import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { autheticator } from '../context/Usercontext';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('alumni');
  const [message, setMessage] = useState('');
  const { loginStatus, setLoginStatus } = useContext(autheticator);
  const {userName,setUser}=useContext(autheticator);
  const {uType,setUType}=useContext(autheticator);

  let navigate = useNavigate();
  console.log("login status value", loginStatus);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //userState to specify which path it should go
      let userState = "";
      if (userType === "student") {
        userState = "students";
        setUType("students");
      } else {
        userState = "alumni";
        setUType("alumni")
      }
      console.log(userState);
      console.log(userType);

      const response = await axios.post(`http://localhost:4000/${uType}/login`, { username, password });
      if (response.data.message === 'Login success') {
        setMessage(response.data.message);
        setLoginStatus(true);
        setUser(username);
        console.log("username:",userName)
        console.log("login status:",loginStatus)
        navigate('/dashboard', { state: { username, userState } });
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Failed to login. Please check your credentials.');
    }
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <div className='container vh-50 d-flex align-items-center'>
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <h2 className="card-header text-center">Login Form</h2>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>User Type:</label>
              <select value={userType} onChange={handleUserTypeChange} className="form-control" required>
                <option value="alumni">Alumni</option>
                <option value="student">Student</option>
              </select>
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-success btn-block mt-3">Login</button>
          </form>
          {message && <p className="mt-3 text-danger">{message}</p>}
          <p className="mt-3">Not yet registered? <a href="/signup">Click here to register</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
