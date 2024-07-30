import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [userType, setUserType] = useState('alumni');
    const navigate = useNavigate();
    const onSubmit = async (formData) => {
        try {
          delete formData.confirmPassword;
            let imageUrl;
            if (formData.profilePhoto && formData.profilePhoto[0]) {
                console.log('Profile photo found, starting upload'); 
                console.log('Image uploaded, URL:', imageUrl); 
            }
            const usernameCheckUrl = `http://localhost:4000/check_username/${formData.username}`;
            const usernameCheckResponse = await axios.get(usernameCheckUrl);

            if (usernameCheckResponse.data.exists) {
                alert('Username is already taken. Please choose a different one.');
                return;
            }

            const data = {};
            for (const key in formData) {
            if (key === "profilePhoto") {
              data[key] = imageUrl;
            } else if (userType === 'alumni' || (userType === 'student' && key !== 'areaOfExpertise' && key !== 'professionalBackground' && key !== 'LinkedinUrl')) {
        data[key] = formData[key];
                }
        }


            const url = userType === 'alumni' ? 'http://localhost:4000/alumni/create_user' : 'http://localhost:4000/students/create_user';

            const response = await axios.post(url, data);
            const userId = response.data.userId;
            const fetchUrl = userType === 'alumni' ? `http://localhost:4000/alumni/get_user/${userId}` : `http://localhost:4000/students/get_user/${userId}`;

            const userDataResponse = await axios.get(fetchUrl);
            const imageUrlFromServer = userDataResponse.data.profilePhoto;
            setImageUrl(imageUrlFromServer);
            alert('User created successfully');
            navigate('/login');
        } catch (error) {
            alert('Something went wrong in creating user');
        }
    };

    const uploadFile = async (file) => {
        console.log('Starting uploadFile function'); // Check if this is printed
        console.log('File:', file); // Log the file to be uploaded
        const storageRef = ref(storage, `images/${file.name + v4()}`);
        try {
            const snapshot = await uploadBytes(storageRef, file);
            console.log('Uploaded a blob or file!', snapshot); // Check if this is printed
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

    const handleUserTypeChange = (e) => {
        console.log('User type changed:', e.target.value); // Check if this is printed
        setUserType(e.target.value);
    };

    return (
        <div className="container vh-100 d-flex align-items-center">
            <div className="bg-light p-4 mx-auto w-100" style={{ maxWidth: '600px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <h1 className="text-center mt-2">Registration Form</h1><br />
                <form className="row row-cols-2 p-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="userType">User Type:</label>
                        <select id="userType" value={userType} onChange={handleUserTypeChange} className="form-control">
                            <option value="alumni">Alumni</option>
                            <option value="student">Student</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="profilePhoto">Profile Photo:</label>
                        <input type="file"  accept=".jpg ,.jpeg "id="profilePhoto" {...register('profilePhoto', { required: true })} className="form-control" />
                        {errors.profilePhoto && <span className="error">Profile Photo is required</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" {...register('name', { required: true })} className="form-control" />
                        {errors.name && <span className="error">Name is required</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" {...register('username', { required: true })} className="form-control" />
                        {errors.username && <span className="error">Username is required</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" {...register('password', { required: true })} className="form-control" />
                        {errors.password && <span className="error">Password is required</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" {...register('confirmPassword', { required: true })} className="form-control" />
                        {errors.confirmPassword && <span className="error">Confirm Password is required</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input type="date" id="dob" {...register('dob', { required: true })} className="form-control" />
                        {errors.dob && <span className="error">Date of Birth is required</span>}
                    </div>

                    <div className="form-group">
                        <label>Gender:</label><br />
                        <label>
                            <input type="radio" {...register('gender', { required: true })} value="male" /> Male
                        </label>
                        <label>
                            <input type="radio" {...register('gender', { required: true })} value="female" /> Female
                        </label>
                        <label>
                            <input type="radio" {...register('gender', { required: true })} value="other" /> Other
                        </label>
                        {errors.gender && <span className="error">Gender is required</span>}
                    </div>

                    {userType === 'alumni' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="areaOfExpertise">Area of Expertise:</label>
                                <input type="text" id="areaOfExpertise" {...register('areaOfExpertise', { required: true })} className="form-control" />
                                {errors.areaOfExpertise && <span className="error">Area of Expertise is required</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="professionalBackground">Professional Background:</label>
                                <input type="text" id="professionalBackground" {...register('professionalBackground', { required: true })} className="form-control" />
                                {errors.professionalBackground && <span className="error">Professional Background is required</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="LinkedinUrl">Linkedin Profile Url:</label>
                                <input type="text" id="LinkedinUrl" {...register('LinkedinUrl', { required: true })} className="form-control" />
                                {errors.LinkedinUrl && <span className="error">Linkedin profile is required</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="college">Select College:</label>
                                <select id="college" {...register('college', { required: true })} className="form-control">
                                    <option value="">Select College</option>
                                    <option value="VNR VJIET">VNR VJIET</option>
                                    <option value="CBIT">CBIT</option>
                                    <option value="JNTUH">JNTUH</option>
                                    <option value="GRIET">GRIET</option>
                                </select>
                                {errors.college && <span className="error">College is required</span>}
                            </div>
                        </>
                    )}

                    {userType === 'student' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="passingYear">Passing Year:</label>
                                <input type="text" id="passingYear" {...register('passingYear', { required: true })} className="form-control" />
                                {errors.passingYear && <span className="error">Passing Year is required</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="college">Select College:</label>
                                <select id="college" {...register('college', { required: true })} className="form-control">
                                    <option value="">Select College</option>
                                    <option value="VNR VJIET">VNR VJIET</option>
                                    <option value="CBIT">CBIT</option>
                                    <option value="JNTUH">JNTUH</option>
                                    <option value="GRIET">GRIET</option>
                                </select>
                                {errors.college && <span className="error">College is required</span>}
                            </div>
                        </>
                    )}

                    <button type="submit" className="col-2 m-3 btn btn-success">Submit</button>
                </form>
                <p className="mt-3">Already registered? <a href="/login">Click here for login</a></p>
                {/* {imageUrl && (
                    <div className="mt-3 text-center">
                        <h3>Uploaded Profile Photo:</h3>
                        {imageUrl && <img src={imageUrl} alt="Uploaded Profile" style={{ maxWidth: '100%', height: 'auto' }} />}
                    </div>
                )} */}
            </div>
        </div>
    );
}

export default Register;
