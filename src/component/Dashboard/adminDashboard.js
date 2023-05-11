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
	const [allSeller, setAllSeller] = useState([]);
	const [allPets, setAllPets] = useState([]);
	const [allLgu, setAllLgu] = useState([]);
	const [allOwner, setAllOwner] = useState([]);

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

	useEffect(() => {
        db.collection("Pets_Profile")
			.orderBy('P_DateRegistered', 'desc')
        	.get()
        	.then((querySnapshot) => {
				const promises = [];
				querySnapshot.forEach((doc) => {
				const id = doc.data().P_IDNumber;
				const name = doc.data().P_Name;
				const species = doc.data().P_Species;
				const age = doc.data().P_Age;
				const breed = doc.data().P_Breed;
				const color = doc.data().P_Color;
				const dateRegister = doc.data().P_DateRegistered;
				const gender = doc.data().P_Gender;
				const lguAccount = doc.data().P_LGUAccount;
				const neutering = doc.data().P_Neutering;
				const owner = doc.data().P_PetOwner;
				const registerType = doc.data().P_RegisterType;
				const registerLocation = doc.data().P_RegisteredLocation;
				const status = doc.data().P_Status;
    

                const promise = storage
                  .ref()
                  .child(`Pet/${id}`)
                  .getDownloadURL()
                  .then((url) => {
                    return { id, name, url, species, age, breed, color, dateRegister, gender, lguAccount, neutering, owner, registerType, registerLocation, status};
                  })
                  .catch((error) => {
                    console.log(error);
                    return null;
                  });
      
                promises.push(promise);
              
            });
      
            Promise.all(promises).then((data) => {
              setAllPets(data.filter((item) => item !== null));
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
    }, []);

	useEffect(() => {
		db.collection("LGU_Profile")
		  .orderBy('LGU_DateRegistered', 'desc')
		  .get()
		  .then((querySnapshot) => {
			const promises = [];
			querySnapshot.forEach((doc) => {
			  const user = doc.data().LGU_UserName;
			  const branch = doc.data().LGU_BranchName;
			  const address = doc.data().LGU_Address;
			  const contact = doc.data().LGU_ContactNumber;
			  const dateRegister = doc.data().LGU_DateRegistered;
			  const email = doc.data().LGU_Email;
	
	
			  const promise = storage
				.ref()
				.child(`LGU_DVMF/${user}`)
				.getDownloadURL()
				.then((url) => {
				  return { branch,user, url, address, contact, dateRegister, email};
				})
				.catch((error) => {
				  console.log(error);
				  return null;
				});
	
			  promises.push(promise);
			});
	
			Promise.all(promises).then((data) => {
			  setAllLgu(data.filter((item) => item !== null));
			});
		  })
		  .catch((error) => {
			console.log("Error getting documents: ", error);
		  });
	  }, []);

	  useEffect(() => {
		db.collection("PetLovers_Profile")
		  .orderBy('PL_DateRegistered', 'desc')
		  .get()
		  .then((querySnapshot) => {
			const promises = [];
			querySnapshot.forEach((doc) => {
			  const email = doc.data().PL_UserEmail;
			  const firstName = doc.data().PL_FirstName;
			  const lastName = doc.data().PL_LastName;
			  const middleName = doc.data().PL_MiddleName;
			  const address = doc.data().PL_Address;
			  const age = doc.data().PL_Age;
			  const birthdate = doc.data().PL_BirthDate;
			  const contact = doc.data().PL_ContactNumber;
			  const dateRegister = doc.data().PL_DateRegistered;
			  const gender = doc.data().PL_Gender;
			  const location = doc.data().PL_NearbyDVMFLoc;
	
			  const promise = storage
				.ref()
				.child(`PetLover/${email}`)
				.getDownloadURL()
				.then((url) => {
				  return { email, firstName,lastName, url, middleName, address, age, birthdate, contact, dateRegister, gender, location};
				})
				.catch((error) => {
				  console.log(error);
				  return null;
				});
	
			  promises.push(promise);
			});
	
			Promise.all(promises).then((data) => {
			  setAllOwner(data.filter((item) => item !== null));
			});
		  })
		  .catch((error) => {
			console.log("Error getting documents: ", error);
		  });
	  }, []);

	  useEffect(() => {
		db.collection("PetSellerorAdoption_Profile")
		  .get()
		  .then((querySnapshot) => {
			const promises = [];
			querySnapshot.forEach((doc) => {
			  const email = doc.data().PSA_UserEmail;
			  const firstName = doc.data().PSA_FirstName;
			  const lastName = doc.data().PSA_LastName;
			  const middleName = doc.data().PSA_MiddleName;
			  const address = doc.data().PSA_Address;
			  const age = doc.data().PSA_Age;
			  const birthdate = doc.data().PSA_BirthDate;
			  const contact = doc.data().PSA_ContactNumber;
			  const dateRegister = doc.data().PSA_DateRegistered;
			  const gender = doc.data().PSA_Gender;
			  const location = doc.data().PSA_NearbyDVMFLoc;
	  
			  const promise = storage
				.ref()
				.child(`PetSellerOrAdoption/${email}`)
				.getDownloadURL()
				.then((url) => {
				  return { email, firstName,lastName, url, middleName, address, age, birthdate, contact, dateRegister, gender, location};
				})
				.catch((error) => {
				  console.log(error);
				  return null;
				});
	  
			  promises.push(promise);
			});
	  
			Promise.all(promises).then((data) => {
			  setAllSeller(data.filter((item) => item !== null));
			});
		  })
		  .catch((error) => {
			console.log("Error getting documents: ", error);
		  });
	  }, []);

	  	const max3Seller = allSeller.slice(0, 3);
	  	const max3Owner = allOwner.slice(0, 3);
		const max3Lgu = allLgu.slice(0, 3);
		const max3Pets = allPets.slice(0, 3);


	function convertTimeStamp(newDate){
        const date = new Date(newDate.seconds * 1000 + newDate.nanoseconds / 1000000);
        const dateString = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'});
        return dateString;
    }
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
							</div>

							{/* //card here */}
							<div class="row">
								{max3Lgu.map((doc) => (	
									<div class='col-lg-4 col-md-6 mb-4'>
										<div class="card-body">
											<Card.Text>
												<Row>
													<Col xs={3}>
														<Row>
														<img className='petImage' src={doc.url} alt="" />
														</Row>
													</Col>
													<Col>
														<Row>
															<h6 class="fw-bold">{doc.user}</h6>
														</Row>
														<Row>
															<p>{convertTimeStamp(doc.dateRegister)}</p>
														</Row>
													</Col>
												</Row>
											</Card.Text>
										</div>
									</div>
								))}
							</div>
						</div>

						<div class="projects-card">
							<div class="card-header">
								<h3>NEW REGISTERED PETS</h3>
							</div>

							{/* //card here */}
							<div class="row">
								{max3Pets.map((doc) => (	
									<div class='col-lg-4 col-md-6 mb-4'>
										<div class="card-body">
											<Card.Text>
												<Row>
													<Col xs={3}>
														<Row>
															<img className='petImage' src={doc.url} alt="" />
														</Row>
													</Col>
													<Col>
														<Row>
															<h6 class="fw-bold">{doc.name}</h6>
														</Row>
														<Row>
															<p>{convertTimeStamp(doc.dateRegister)}</p>
														</Row>
													</Col>
												</Row>
											</Card.Text>
										</div>
									</div>
								))}
							</div>
						</div>

						<div class="projects-card">
							<div class="card-header">
								<h3>NEW PET OWNERS</h3>
							</div>

							{/* //card here */}
							<div class="row">
								{max3Owner.map((doc) => (	
									<div class='col-lg-4 col-md-6 mb-4'>
										<div class="card-body">
											<Card.Text>
												<Row>
													<Col xs={3}>
														<Row>
														<img className='petImage' src={doc.url} alt="" />
														</Row>
													</Col>
													<Col>
														<Row>
															<h6 class="fw-bold">{(doc.firstName + " "+ doc.lastName)}</h6>
														</Row>
														<Row>
															<p>{convertTimeStamp(doc.dateRegister)}</p>
														</Row>
													</Col>
												</Row>
											</Card.Text>
										</div>
									</div>
								))}
							</div>
						</div>

						<div class="projects-card">
							<div class="card-header">
								<h3>NEW PET SELLER</h3>
							</div>

							{/* //card here */}
							<div class="row">
								{max3Seller.map((doc) => (	
									<div class='col-lg-4 col-md-6 mb-4'>
										<div class="card-body">
											<Card.Text>
												<Row>
													<Col xs={3}>
														<Row>
														<img className='petImage' src={doc.url} alt="" />
														</Row>
													</Col>
													<Col>
														<Row>
															<h6 class="fw-bold">{(doc.firstName + " "+ doc.lastName)}</h6>
														</Row>
														<Row>
															<p>{convertTimeStamp(doc.dateRegister)}</p>
														</Row>
													</Col>
												</Row>
											</Card.Text>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard