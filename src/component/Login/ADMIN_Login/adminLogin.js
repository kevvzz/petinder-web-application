
import './adminLogin.css';
import React, { useState } from 'react';
import logo from '../../../Assets/petinder_logo.png';
import { useNavigate } from 'react-router-dom';
import db from '../../../Firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';


function AdminLogin() {
	const [adminUserName, setAdminUserName] =  useState('');
	const [adminPassword, setAdminPassword] =  useState('');

	const handleUserNameChange = (event) => {
		setAdminUserName(event.target.value);
	  };
	
	  const handlePasswordChange = (event) => {
		setAdminPassword(event.target.value);
	  };
	
	  const navigate = useNavigate();
	  const ref = db.collection("Admin_Profile");
	  console.log(ref);
	  
	  const handleLogin = async (e) => {
		e.preventDefault();
	  
		try {
		  const querySnapshot = await db
			.collection("Admin_Profile")
			.where("A_UserName", "==", adminUserName)
			.get();
	  
		  if (!querySnapshot.empty) {
			// User with the provided email exists
			const userDoc = querySnapshot.docs[0];
			const userData = userDoc.data();
	  
			// Check if the password is correct
			if (userData.A_Password === adminPassword) {
				console.log("Logged in successfully!");
				toast.success("Correct Password");
				setTimeout(() => {
					navigate("/admin-dashboard"); 
				  }, 2000); 	
			} else {
			  console.error("Invalid password!");
			  toast.error("Incorrect Password");
			}
		  } else {
			console.error("User with the provided email does not exist!");
			toast.error("User with the provided email does not exist!");
		  }
		} catch (error) {
		  console.error(error);
		  toast.error("Error Login");
		}
	  };
  return (
    <div class="admin-container">
		<ToastContainer />
		<div class="logo">
			<img class="admin-petinderLogo" src={logo}/>
		</div>
		<div>
			<h1>Admin Login</h1>
		</div>
		
		<div class="admin-form-block">

			<div class="admin-fold">
				<div class="admin-form">
					<form class="form-box">
						<div class="form-input">
							<span><FontAwesomeIcon className='glass' icon={faEnvelope}/></span>
							<input onChange={handleUserNameChange} type="username" name="username" id="username" placeholder="Username" tabindex="10" required/>
						</div>
						<div class="form-input">
						<span><FontAwesomeIcon className='glass' icon={faLock}/></span>
							<input onChange={handlePasswordChange} type="password" name="password" id="password" placeholder="Password" required/>
						</div>
						
						
						<div class="col-12 px-0 text-center">
							<button onClick={handleLogin} type="button" class="btn mb-3">Login</button>
						</div>
					</form>
				</div>
			</div>
		</div>

	</div>
  );
}

export default AdminLogin;
