
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EditProfileForm from './EditProfileForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { autheticator } from '../context/Usercontext';
function ProfileView() {
  const { state } = useLocation();
  const { userdata} = state || {};
  console.log("info",userdata)
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
const {uType}=useContext(autheticator);
const{uData}=useContext(autheticator)
  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="container mt-5">
      {isEditing ? (
        <EditProfileForm userdata={uData} userState={uType} setIsEditing={setIsEditing} />
      ) : (
        <div className="card mx-auto shadow" style={{ maxWidth: '900px' }}>
          <h1 className="mt-4 text-center">Profile</h1>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 text-center">
                <img
                  src={uData.profilePhoto}
                  className="rounded-circle border border-secondary"
                  alt="Profile"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <h5 className="card-title mt-3">{uData.name}</h5>
                <p className="card-text"><strong>Username:</strong> {uData.username}</p>
              </div>
              <div className="col-md-4">
                <div className="card mt-4">
                  <div className="card-header text-center">
                    <h5>Personal Details</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text"><strong>Gender:</strong> {uData.gender}</p>
                    <p className="card-text"><strong>Date of Birth:</strong> {uData.dob}</p>
                    <p className="card-text"><strong>College:</strong> {uData.college}</p>
                    {uType !== "alumni" && (
                      <p className="card-text"><strong>Year of Passing:</strong> {uData.passingYear}</p>
                    )}
                  </div>
                </div>
              </div>
              {uType === "alumni" && (
                <div className="col-md-4">
                  <div className="card mt-4">
                    <div className="card-header text-center">
                      <h5>Professional Details</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text"><strong>LinkedIn Profile:</strong> <a href={uData.LinkedinUrl} target="_blank" rel="noopener noreferrer">View Profile</a></p>
                      <p className="card-text"><strong>Professional Background:</strong> {uData.professionalBackground}</p>
                      <p className="card-text"><strong>Area of Expertise:</strong> {uData.areaOfExpertise}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={handleEditClick}>Edit Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileView;

