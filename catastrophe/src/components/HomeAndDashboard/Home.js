//Home.js
import React, { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { autheticator } from '../context/Usercontext';

const HomePage = ({ userType }) => {
  const {loginStatus}=useContext(autheticator);
  const navigate = useNavigate();
  useEffect(() => {
    if (loginStatus) {
      // setLoginStatus(false)
    }
  })

  useEffect(() => {
    if (userType === 'student') {
      navigate('/dashboard');
    } else if (userType === 'alumni') {
      navigate('/registration');
    }
  }, [userType, navigate]);

  return (
    <div className="container mt-3 mb-5 justify-items-center ">
      <h3 className="text-center">Welcome to the Student and Alumni Portal</h3><br></br>
      <br></br><br></br><br></br>
      <div className="row justify-content-center mt-5 mb-5">
      <div className="mt-5">
        <div className="p-3  mt-3 mb-3 bg-light border rounded">
        <h4 className="text-center"> <i>Students:</i></h4>
          <blockquote className="blockquote justify-content-center">
            <p className="mb-0">"Education is the passport to the future, for tomorrow belongs to those who prepare for it today." – Malcolm X</p>
          </blockquote>
        </div>
      </div>
      <div className="mt-4">
        
        <div className="p-3 mb-3 bg-light border rounded">
        <h4 className="text-center text-color-white"><i>Alumni:</i></h4>
          <blockquote className="blockquote ml-5 justify-content-center">
            <p className="mb-0">"The beautiful thing about learning is that no one can take it away from you." – B.B. King</p>
          </blockquote>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
