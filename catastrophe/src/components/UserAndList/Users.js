import React from 'react';
import { useNavigate } from 'react-router-dom';

function Users(props) {
  const userdata = props.data;
  const navigate = useNavigate();

  return (
    <div className="card text-center mt-4 scale-1.5">
      <div className="card-body h-50">
        <h2 className="text-success" style={{ fontFamily: "san-serif" }}><i>{userdata.name}</i></h2>
        <p className='text-primary'>Username: {userdata.username}</p>
        <p className='text-success'>College: {userdata.college}</p>
        <p className='text-primary'>LinkedIn Profile:</p>
        <a href={userdata.LinkedinUrl} target="_blank" rel="noopener noreferrer">{userdata.username}'s LinkedIn Profile</a>
        <br />
          <button className="btn btn-success mt-3" onClick={()=>navigate('/alumini-profile',{state: {userdata}})}>View Full Profile</button>
      </div>
    </div>
  );
}

export default Users;
