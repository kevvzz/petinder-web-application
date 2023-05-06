import React, { useState, useEffect } from 'react'
import { AdminNavbar } from '../Navbar/Navbar';
import petRegisterIcon from '../../Assets/pet_registered.png';
import sellerIcon from '../../Assets/pet_seller.png';
import ownerIcon from '../../Assets/pet_owner.png';
import lguIcon from '../../Assets/Lgu.png';
import petPhoto from '../../Assets/chowa.jpg';
import ownerPhoto from '../../Assets/profile-picture.png'
import lguPhoto from '../../Assets/lgu-cebu-logo.png';
import { Card, Row, Col } from 'react-bootstrap';

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
			<AdminNavbar />
			<div className="main-content">

				<div class="cards">
					<div class="card-single">
						<div>
							<h1>{counts.collection1}</h1>
							<span class="spanName">Registered Pet</span>
						</div>
						<div>
							<span><img className='imageIcon' src={petRegisterIcon} alt="" /></span>
						</div>
					</div>

					<div class="card-single">
						<div>
							<h1>{counts.collection4}</h1>
							<span class="spanName">Pet Seller</span>
						</div>
						<div>
							<span><img className='imageIcon' src={sellerIcon} alt="" /> </span>
						</div>
					</div>

					<div class="card-single">
						<div>
							<h1>{counts.collection2}</h1>
							<span class="spanName">Pet Owner</span>
						</div>
						<div>
							<span><img className='imageIcon' src={ownerIcon} alt="" /></span>
						</div>
					</div>

					<div class="card-single">
						<div>
							<h1>{counts.collection3}</h1>
							<span class="spanName">LGUs</span>
						</div>
						<div>
							<span><img className='imageIcon' src={lguIcon} alt="" /></span>
						</div>
					</div>
				</div>

				<div class="recent-grid">
					<div class="projects">
						<div class="projects-card">
							<div class="card-header">
								<h3>NEW LGU USERS</h3>
								<button>See all <span><i class="fa-solid fa-arrow-right"></i></span></button>
							</div>

							{/* //card here */}
							<div class="row">
								<div class='col-lg-4 col-md-6 mb-4'>
									<div class="card-body">
										<Card.Text>
											<Row>
												<Col xs={4}>
													<Row>
														<img className='petImage' src={lguPhoto} alt="" />
													</Row>
												</Col>
												<Col>
													<Row>
														<h6 class="fw-bold">LGU-DVMF TALISAY</h6>
													</Row>
													<Row>
														<p>Date Registered: February 10, 2023 </p>
													</Row>
												</Col>
											</Row>
										</Card.Text>
									</div>
								</div>
								<div class='col-lg-4 col-md-6 mb-4'>
									<div class="card-body">
										<Card.Text>
											<Row>
												<Col xs={4}>
													<Row>
														<img className='petImage' src={lguPhoto} alt="" />
													</Row>
												</Col>
												<Col>
													<Row>
														<h6 class="fw-bold">LGU-DVMF CEBU</h6>
													</Row>
													<Row>
														<p>Date Registered: February 10, 2023 </p>
													</Row>
												</Col>
											</Row>
										</Card.Text>
									</div>
								</div>
								<div class='col-lg-4 col-md-6 mb-4'>
									<div class="card-body">
										<Card.Text>
											<Row>
												<Col xs={4}>
													<Row>
														<img className='petImage' src={lguPhoto} alt="" />
													</Row>
												</Col>
												<Col>
													<Row>
														<h6 class="fw-bold">LGU-DVMF MANDAUE</h6>
													</Row>
													<Row>
														<p>Date Registered: February 10, 2023 </p>
													</Row>
												</Col>
											</Row>
										</Card.Text>
									</div>
								</div>

							</div>
						</div>

						<div class="projects-card">
							<div class="card-header">
								<h3>NEW REGITERED PETS</h3>
								<button>See all <span><i class="fa-solid fa-arrow-right"></i></span></button>
							</div>

							{/* //card here */}
							<div class="row">
								<div class='col-lg-4 col-md-6 mb-4'>
									<div class="card-body">
										<Card.Text>
											<Row>
												<Col xs={4}>
													<Row>
													<img img className='petImage' src={petPhoto} alt="" />
													</Row>
												</Col>
												<Col>
													<Row>
														<h6 class="fw-bold">CHOWA</h6>
													</Row>
													<Row>
														<p>Date Registered: February 10, 2023 </p>
													</Row>
												</Col>
											</Row>
										</Card.Text>
									</div>
								</div>
								<div class='col-lg-4 col-md-6 mb-4'>
									<div class="card-body">
										<Card.Text>
											<Row>
												<Col xs={4}>
													<Row>
														<img img className='petImage' src={petPhoto} alt="" />
													</Row>
												</Col>
												<Col>
													<Row>
														<h6 class="fw-bold">CHOWA</h6>
													</Row>
													<Row>
														<p>Date Registered: February 10, 2023 </p>
													</Row>
												</Col>
											</Row>
										</Card.Text>
									</div>
								</div>
								<div class='col-lg-4 col-md-6 mb-4'>
									<div class="card-body">
										<Card.Text>
											<Row>
												<Col xs={4}>
													<Row>
														<img img className='petImage' src={petPhoto} alt="" />
													</Row>
												</Col>
												<Col>
													<Row>
														<h6 class="fw-bold">CHOWA</h6>
													</Row>
													<Row>
														<p>Date Registered: February 10, 2023 </p>
													</Row>
												</Col>
											</Row>
										</Card.Text>
									</div>
								</div>

							</div>
						</div>

						<div class="projects-card">
							<div class="card-header">
								<h3>NEW PET OWNERS</h3>
								<button>See all <span><i class="fa-solid fa-arrow-right"></i></span></button>
							</div>

							{/* //card here */}
							<div class="row">
								<div class='col-lg-4 col-md-6 mb-4'>
									<div class="card-body">
										<Card.Text>
											<Row>
												<Col xs={4}>
													<Row>
														<img className='petImage' src={ownerPhoto} alt="" />
													</Row>
												</Col>
												<Col>
													<Row>
														<h6 class="fw-bold">CLARK</h6>
													</Row>
													<Row>
														<p>Date Registered: February 10, 2023 </p>
													</Row>
												</Col>
											</Row>
										</Card.Text>
									</div>
								</div>
								<div class='col-lg-4 col-md-6 mb-4'>
									<div class="card-body">
										<Card.Text>
											<Row>
												<Col xs={4}>
													<Row>
														<img className='petImage' src={ownerPhoto} alt="" />
													</Row>
												</Col>
												<Col>
													<Row>
														<h6 class="fw-bold">CLARK</h6>
													</Row>
													<Row>
														<p>Date Registered: February 10, 2023 </p>
													</Row>
												</Col>
											</Row>
										</Card.Text>
									</div>
								</div>
								<div class='col-lg-4 col-md-6 mb-4'>
									<div class="card-body">
										<Card.Text>
											<Row>
												<Col xs={4}>
													<Row>
														<img className='petImage' src={ownerPhoto} alt="" />
													</Row>
												</Col>
												<Col>
													<Row>
														<h6 class="fw-bold">CLARK</h6>
													</Row>
													<Row>
														<p>Date Registered: February 10, 2023 </p>
													</Row>
												</Col>
											</Row>
										</Card.Text>
									</div>
								</div>

							</div>
						</div>

						<div class="projects-card">
							<div class="card-header">
								<h3>NEW PET SELLER</h3>
								<button>See all <span><i class="fa-solid fa-arrow-right"></i></span></button>
							</div>

							{/* //card here */}
							<div class="row">
								<div class='col-lg-4 col-md-6 mb-4'>
									<div class="card-body">
										<Card.Text>
											<Row>
												<Col xs={4}>
													<Row>
														<img className='petImage' src={ownerPhoto} alt="" />
													</Row>
												</Col>
												<Col>
													<Row>
														<h6 class="fw-bold">CLARK</h6>
													</Row>
													<Row>
														<p>Date Registered: February 10, 2023 </p>
													</Row>
												</Col>
											</Row>
										</Card.Text>
									</div>
								</div>
								<div class='col-lg-4 col-md-6 mb-4'>
									<div class="card-body">
										<Card.Text>
											<Row>
												<Col xs={4}>
													<Row>
														<img className='petImage' src={ownerPhoto} alt="" />
													</Row>
												</Col>
												<Col>
													<Row>
														<h6 class="fw-bold">CLARK</h6>
													</Row>
													<Row>
														<p>Date Registered: February 10, 2023 </p>
													</Row>
												</Col>
											</Row>
										</Card.Text>
									</div>
								</div>
								<div class='col-lg-4 col-md-6 mb-4'>
									<div class="card-body">
										<Card.Text>
											<Row>
												<Col xs={4}>
													<Row>
														<img className='petImage' src={ownerPhoto} alt="" />
													</Row>
												</Col>
												<Col>
													<Row>
														<h6 class="fw-bold">CLARK</h6>
													</Row>
													<Row>
														<p>Date Registered: February 10, 2023 </p>
													</Row>
												</Col>
											</Row>
										</Card.Text>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* <table width="100%">
									<thead>
										<tr>
											<td>Profile Picture</td>
											<td>Anounements</td>
											<td>Date</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<img className='petImage' src={lguPhoto} alt="" />
											<td>
												<div class="customer-info">
													<h5>Free Vaccine</h5>
												</div>
											</td>
											<td>
												<div class="customer-info">
													<h6>February 10, 2023</h6>
												</div>
											</td>
										</tr>
									</tbody> 
								</table> */}

					{/* <div class="projects-card">
							<div class="card-header">
								<h3>Newly Registered Pet</h3>
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
											<td><img img className='petImage' src={petPhoto} alt="" /></td>
											<td>
												<div class="customer-info">
													<h4>Chowa</h4>
												</div>
											</td>
											<td>
												<div class="customer-info">
													<h6>February 10, 2023</h6>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div class="projects-card">
							<div class="card-header">
								<h3>New Pet Owner</h3>
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
											<td><img className='petImage' src={ownerPhoto} alt="" /></td>
											<td>
												<div class="customer-info">
													<h4>Clark</h4>
												</div>
											</td>
											<td>
												<div class="customer-info">
													<h6>January 14, 2022</h6>
												</div>
											</td>
										</tr>

									</tbody>
								</table>
							</div>
						</div>

						<div class="projects-card">
							<div class="card-header">
								<h3>New Pet Seller</h3>
							</div>
							<div class="card-body">
								<table width="100%">
									<thead>
										<tr>
											<td>Profile Picture</td>
											<td>Pet Seller Name</td>
											<td>Date Registered</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td><img className='petImage' src={ownerPhoto} alt="" /></td>
											<td>
												<div class="customer-info">
													<h4>Clark</h4>
												</div>
											</td>
											<td>
												<div class="customer-info">
													<h6>January 14, 2022</h6>
												</div>
											</td>
										</tr>

									</tbody>
								</table>
							</div>
						</div> */}
				</div>

				{/* <div class="customers">
						<div class="project-card">
							<div class="card-header">
								<h3>LGU-DVMF<br></br>New Clients</h3>
								<button>See all <span><i class="fa-solid fa-arrow-right"></i></span></button>
							</div>
							<div class="card-body">
								<div class="customer">
									<div class="customer-table">
										<img className='lguImage' src={lguPhoto} alt="" />
										<div class="customer-info">
											<h5>LGU-DVMF TALISAY</h5>
											<p>Date Registered: </p>
											<p>February 10, 2023</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> */}
			</div>
		</div>
	)
}

export default AdminDashboard