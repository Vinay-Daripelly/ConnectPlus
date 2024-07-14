import React from 'react'
import UserList from '../UserAndList/UserList'
import user from '../../images/user.jpeg'
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const navigate = useNavigate()
  const handleChatClick = () => {
    navigate('/profile')

  };
  return (

    <div >
      <div className='d-flex justify-content-between'>
        <p className='display-6 text-start text-info fS-2'>Welcome  ! </p>
        <div className="" onClick={handleChatClick}>
          <div className='d-flex justify-content-center align-items-center'>
          <img src={user} className="rounded-circle" alt="Profile" style={{ width: '50px', height: '50px', textAlign: "center" }} />
          </div>
          
          <p className=' text-end text-info fS-2'>View & Edit Your Profile</p>
        </div>


      </div>


      <UserList />
    </div>
  )
}


export default Dashboard