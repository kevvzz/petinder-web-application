
import './lguLogin.css';
import React, { useState } from 'react';
import logo from '../../../Assets/petinder_logo.png';
import { useNavigate } from 'react-router-dom';
import db from '../../../Firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

//Firebase Firestore
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function LguLogin() {
	const [lguUserName, setLGUUserName] =  useState('');
	const [lguPassword, setLGUPassword] =  useState('');

	const handleUserNameChange = (event) => {
		setLGUUserName(event.target.value);
	  };
	
	  const handlePasswordChange = (event) => {
		setLGUPassword(event.target.value);
	  };
	
	  const navigate = useNavigate();
	  const ref = db.collection("LGU_Profile");
	  console.log(ref);
	  const loginAuth = lguUserName+"@petinder.com";

	  const handleLogin = async (e) => {
		e.preventDefault();
		try {
		  await firebase.auth().signInWithEmailAndPassword(loginAuth, lguPassword);
		  console.log('User logged in successfully.');
		  const querySnapshot = await db
			.collection("LGU_Profile")
			.where("LGU_UserName", "==", lguUserName)
			.get();
	  
		  if (!querySnapshot.empty) {
			// User with the provided email exists
			const userDoc = querySnapshot.docs[0];
			const lguData = userDoc.data();
			localStorage.setItem('lguData', JSON.stringify(lguData));
			toast.success("Correct Password");
				setTimeout(() => {
					navigate("/lgu-register"); 
				  }, 2000); 
		  } else {
			console.error("User with the provided email does not exist!");
			toast.error("User with the provided email does not exist!");
		  }
		} catch (error) {
		  console.error('Login failed:', error);
		  toast.error("Incorrect Email or Password");
		}
	  };
  return (
    <div class="lgu-container">
		<ToastContainer />
		<div class="logo">
			<img class="lgu-petinderLogo" src={logo}/>
		</div>
		<div>
			<h1>LGU Login</h1>
		</div>
		
		<div class="lgu-form-block">

			<div class="lgu-fold">
				<div class="lgu-form">
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

export default LguLogin;
