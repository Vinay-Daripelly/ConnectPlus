import React, { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { autheticator } from '../context/Usercontext';

const HomePage = ({ userType }) => {
  const {loginStatus,setLoginStatus}=useContext(autheticator);
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
    <div className="container mt-5 justify-items-center bg-color-white">
      <h3 className="text-center">Welcome to the Student and Alumni Portal</h3>
      <div className="mt-4">
        <h4 className="text-center"> <i>Students:</i></h4>
        <div className="p-3 mb-3 bg-light border rounded">
          <blockquote className="blockquote">
            <p className="mb-0">"Education is the passport to the future, for tomorrow belongs to those who prepare for it today." – Malcolm X</p>
          </blockquote>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-center text-color-white"><i>Alumni</i></h4>
        <div className="p-3 mb-3 bg-light border rounded">
          <blockquote className="blockquote">
            <p className="mb-0">"The beautiful thing about learning is that no one can take it away from you." – B.B. King</p>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
