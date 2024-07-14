import { useLocation } from 'react-router-dom';
import chatIcon from '../../images/chat-icon.png'
import graduated from '../../images/graduated.jpg'
function AlumniProfile() {
  const {state} = useLocation();
  const { userdata } = state;
  console.log("user data is : ",userdata)
  const handleChatClick = () => {
    window.location.href = 'http://localhost:5173/';
  };
  return (
    <div className="container">
    <div className="card mt-4 mx-auto" style={{ maxWidth: '400px' }}>
    <h1 className="mt-4 text-center">Profile</h1>
      <div className="card-body text-center">
        <img src={graduated} className="card-img-top rounded-circle border-5-black" alt="Profile" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
        <h5 className="card-title mt-3">{userdata.name}</h5>
        <p className="card-text">Username: {userdata.username}</p>
        <p className="card-text">College: {userdata.college}</p>
        <p className="card-text">LinkedIn Profile: <a href={userdata.LinkedinUrl} target="_blank" rel="noopener noreferrer"> View-Profile</a></p>
        <p className="card-text">Professional Background:{userdata.professionalBackground}</p>
        <p className="card-text">Area of Expertise: {userdata.areaOfExpertise}</p>
        <div style={{ marginTop: '20px', cursor: 'pointer' }} onClick={handleChatClick}>
        <img src={chatIcon} alt="Chat Icon" style={{ width: '50px', height: '50px' }} />
      </div>
      </div>
    </div>
  </div>
  );
}

export default AlumniProfile;
 