import React, { useState,useEffect } from 'react'
import {LguNavbar} from '../Navbar/Navbar';
import {Row, Col, InputGroup, Form, Card} from 'react-bootstrap'
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import AddAnnouncement from './AddAnnouncement';
import 'bootstrap/dist/css/bootstrap.min.css';
import lguPhoto from '../../Assets/lgu-cebu-logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faDog, faCat, faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function LguAnnouncement() {
    const userData = JSON.parse(localStorage.getItem('lguData'));
    console.log(userData);
    const navigate = useNavigate()
    const [allPets, setAllPets] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [filteredPets, setFilteredPets] = useState([]);
    function onClickAddPet() {
        setShowAddModal(true);
    }

    useEffect(() => {
        db.collection("Pets_Profile")
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
    
              if (registerLocation === userData.LGU_BranchName || lguAccount === userData.LGU_UserName) {
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
              }
            });
      
            Promise.all(promises).then((data) => {
              setAllPets(data.filter((item) => item !== null));
              setFilteredPets(data.filter((item) => item !== null));
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }, []);
 
  function searchFilter(e) {
    let term = e.target.value.toLowerCase();
    if (term == "") {
      setFilteredPets(allPets);
    } else {
      setFilteredPets(
        filteredPets.filter(
          (pet) => pet.name.toLowerCase().indexOf(term) !== -1 || pet.id.indexOf(term) !== -1
        )
      );
    }
  }

function petFilter(filter) {
   
        if (filter === "all") {
            setFilteredPets(allPets);

        } else if(filter === "Canine"){

            setFilteredPets(allPets.filter(pet => pet.species === filter));
        }else if(filter === "Feline"){

            setFilteredPets(allPets.filter(pet => pet.species === filter));
        } else {
            toast.error("error pets");
        }
}

  return (
    <div className='main-bg'>
        <LguNavbar/>
        <ToastContainer/>
        <div className="main-content">
            
            <header>
                <h1>
                    LGU Announcement
                </h1>
            </header>
            <div className="container">
                <Row className='bottomSpace'>
                    <Col  xs={2}>
                        <Row>
                            <div className="button-wrapper" onClick={onClickAddPet}>
                                <button type="button" className="add"><FontAwesomeIcon icon={faFileCirclePlus}/><span> </span>ADD NEW</button>
                            </div>
                        </Row>
                    </Col>
                    <Col xs={7}>
                        <Row>
                            <InputGroup className="search-employee">
                            <InputGroup.Text className='icon-part'><FontAwesomeIcon className='glass' icon={faMagnifyingGlass}/></InputGroup.Text>
                            <Form.Control
                                className="search-part me-3"
                                type="text"
                                autoComplete="off"
                                aria-label="term"
                                aria-describedby="term"
                                placeholder="Search Pets"
                                name="term"
                                id="term"
                                required
                                onChange={(e) => searchFilter(e)}
                                />
                            </InputGroup>
                        </Row>
                    </Col>
                </Row>
                <AddAnnouncement
                    showmodal1 = {showAddModal}
                    hidemodal1 = {() => setShowAddModal(false)}
                    showmodal1handler = {onClickAddPet}
                />
                {/* <div className="rowCard">
                    {filteredPets.map((doc) => (
                    
                    ))}
                </div> */}
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
                </div>
              </div>
            </div>	
        </div>	
  )
}

export default LguAnnouncement