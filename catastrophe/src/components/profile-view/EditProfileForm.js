import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProfileForm({ userdata, setIsEditing }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Set default values for the form fields
    setValue('name', userdata.name);
    setValue('username', userdata.username);
    setValue('college', userdata.college);
    setValue('LinkedinUrl', userdata.LinkedinUrl);
    setValue('professionalBackground', userdata.professionalBackground);
    setValue('areaOfExpertise', userdata.areaOfExpertise);
    setValue('passingYear', userdata.passingYear);
    setValue('dob', userdata.dob);
    setValue('gender', userdata.gender);
    // More fields as necessary
  }, [userdata, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`http://localhost:4000/alumni/update_user/${userdata.username}`, data);
      console.log('User updated successfully:', response.data);
      setIsEditing(false);
      navigate('/profile', { state: { userdata: response.data } });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card mx-auto" style={{ maxWidth: '900px' }}>
        <h1 className="text-center mt-4">Edit Profile</h1>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-4">
                <div className="text-center mb-3">
                  <img
                    src={userdata.profilePhoto}
                    className="card-img-top rounded-circle border border-secondary"
                    alt="Profile"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" {...register('name', { required: true })} className="form-control" />
                  {errors.name && <span className="text-danger">Name is required</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" {...register('username')} className="form-control" readOnly />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="college">Select College:</label>
                  <select id="college" {...register('college', { required: true })} className="form-control">
                    <option value="">Select College</option>
                    <option value="VNR VJIET">VNR VJIET</option>
                    <option value="CBIT">CBIT</option>
                    <option value="JNTUH">JNTUH</option>
                    <option value="GRIET">GRIET</option>
                  </select>
                  {errors.college && <span className="text-danger">College is required</span>}
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="dob">Date of Birth:</label>
                  <input type="date" id="dob" {...register('dob', { required: true })} className="form-control" />
                  {errors.dob && <span className="text-danger">Date of Birth is required</span>}
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id="male" {...register('gender', { required: true })} value="Male" />
                    <label className="form-check-label" htmlFor="male">Male</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id="female" {...register('gender', { required: true })} value="Female" />
                    <label className="form-check-label" htmlFor="female">Female</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id="other" {...register('gender', { required: true })} value="Other" />
                    <label className="form-check-label" htmlFor="other">Other</label>
                  </div>
                  {errors.gender && <span className="text-danger">Gender is required</span>}
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" {...register('password', { required: true, minLength: 6 })} className="form-control" />
                  {errors.password && <span className="text-danger">Password is required and should be at least 6 characters long</span>}
                </div>
              </div>
              <div className="col-md-4">
                {userdata.userType !== 'student' ? (
                  <>
                    <div className="form-group">
                      <label htmlFor="LinkedinUrl">LinkedIn Profile URL:</label>
                      <input type="url" id="LinkedinUrl" {...register('LinkedinUrl', { required: true })} className="form-control" />
                      {errors.LinkedinUrl && <span className="text-danger">LinkedIn URL is required</span>}
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="professionalBackground">Professional Background:</label>
                      <input type="text" id="professionalBackground" {...register('professionalBackground', { required: true })} className="form-control" />
                      {errors.professionalBackground && <span className="text-danger">Professional Background is required</span>}
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="areaOfExpertise">Area of Expertise:</label>
                      <input type="text" id="areaOfExpertise" {...register('areaOfExpertise', { required: true })} className="form-control" />
                      {errors.areaOfExpertise && <span className="text-danger">Area of Expertise is required</span>}
                    </div>
                  </>
                ) : (
                  <><div className="form-group mt-2">
                  <label htmlFor="passingYear">Year of Passing:</label>
                  <input type="text" id="passingYear" {...register('passingYear', { required: true })} className="form-control" />
                  {errors.passingYear && <span className="text-danger">Year of Passing is required</span>}
                </div></>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-success mt-3">Save Changes</button>
            <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfileForm;

