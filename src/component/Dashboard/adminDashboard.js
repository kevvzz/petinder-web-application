import React, { useState,useEffect } from 'react'
import {AdminNavbar} from '../Navbar/Navbar';
import petRegisterIcon from '../../Assets/pet_registered.png';
import sellerIcon from '../../Assets/pet_seller.png';
import ownerIcon from '../../Assets/pet_owner.png';
import lguIcon from '../../Assets/Lgu.png';
import petPhoto from '../../Assets/chowa.jpg';
import ownerPhoto from '../../Assets/profile-picture.png'
import lguPhoto from '../../Assets/lgu-cebu-logo.png';

//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
//CSS
import '../../profile.css';
import '../../App.css';
import './adminDashboard.css';
function AdminDashboard() {
	const [counts, setCounts] = useState({});

	useEffect(() => {
	
		const unsubscribeFunctions = [
		  db.collection("Pets_Profile").onSnapshot((querySnapshot) => {
			setCounts((prevCounts) => ({ ...prevCounts, collection1: querySnapshot.size }));
		  }),
		  db.collection("PetLovers_Profile").onSnapshot((querySnapshot) => {
			setCounts((prevCounts) => ({ ...prevCounts, collection2: querySnapshot.size }));
		  }),
		  db.collection("LGU_Profile").onSnapshot((querySnapshot) => {
			setCounts((prevCounts) => ({ ...prevCounts, collection3: querySnapshot.size }));
		  }),
		  db.collection("PetSellerorAdoption_Profile").onSnapshot((querySnapshot) => {
			setCounts((prevCounts) => ({ ...prevCounts, collection4: querySnapshot.size }));
		  }),
		];
	
		return () => {
		  unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
		};
	  }, []);
  return (
    <div className='main-bg'>
        <AdminNavbar/>
        <div className="main-content">
            
        <div class="cards">
				<div class="card-single">
					<div>
						<h1>{counts.collection1}</h1>
						<span class="spanName">Registered Pet</span>
					</div>
					<div>
                    <span><img className='imageIcon' src={petRegisterIcon} alt=""/></span>
					</div>
				</div>

				<div class="card-single">
					<div>
						<h1>{counts.collection4}</h1>
						<span class="spanName">Pet Seller</span>
					</div>
					<div>
						<span><img className='imageIcon' src={sellerIcon} alt=""/> </span>
					</div>
				</div>

				<div class="card-single">
					<div>
						<h1>{counts.collection2}</h1>
						<span class="spanName">Pet Owner</span>
					</div>
					<div>
						<span><img className='imageIcon' src={ownerIcon} alt=""/></span>
					</div>
				</div>

				<div class="card-single">
					<div>
						<h1>{counts.collection3}</h1>
						<span class="spanName">LGUs</span>
					</div>
					<div>
						<span><img className='imageIcon' src={lguIcon} alt=""/></span>
					</div>
				</div>
			</div>

			<div class="recent-grid">
				<div class="projects">
					<div class="projects-card">
						<div class="card-header">
							<h3>Newly Registered Pet</h3>
							<button>See all <span><i class="fa-solid fa-arrow-right"></i></span></button>
						</div>
						<div class="card-body">
							<table width="100%">
								<thead>
									<tr>
										<td>Profile Picture</td>
										<td>Pet Name</td>
										<td>Date Registered</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><img img className='petImage' src={petPhoto} alt=""/></td>
										<td>
											<div class="customer-info">
												<h3>Chowa</h3>
											</div>
										</td>
										<td>
											<div class="customer-info">
												<p>February 10, 2023</p>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div class="projects-card">
						<div class="card-header">
							<h3>Pet Owner</h3>
							<button>See all <span><i class="fa-solid fa-arrow-right"></i></span></button>
						</div>
						<div class="card-body">
							<table width="100%">
								<thead>
									<tr>
										<td>Profile Picture</td>
										<td>Pet Owner Name</td>
										<td>Date Registered</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><img className='petImage' src={ownerPhoto} alt=""/></td>
										<td>
											<div class="customer-info">
												<h3>Clark</h3>
											</div>
										</td>
										<td>
											<div class="customer-info">
												<p>January 14, 2022</p>
											</div>
										</td>
									</tr>
									
								</tbody>
							</table>
						</div>
					</div>
				</div>
				
				<div class="customers">
					<div class="card">
						<div class="card-header">
							<h3>LGU-DVMF<br></br>New Clients</h3>
							<button>See all <span><i class="fa-solid fa-arrow-right"></i></span></button>
						</div>
						<div class="card-body">
							<div class="customer">
								<div class="customer-table">
									<img className='lguImage' src={lguPhoto} alt=""/>
									<div class="customer-info">
										<h5>LGU-DVMF TALISAY</h5>
										<p>Date Registered: </p>
										<p>February 10, 2023</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
    </div>	
  )
}

export default AdminDashboard