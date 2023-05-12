import React, { useState,useEffect } from 'react'
import {LguNavbar} from '../Navbar/Navbar';
import {Row, Col, InputGroup, Form} from 'react-bootstrap'
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import AddLguPets from './AddLguPets';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faDog, faCat, faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function LguRegisteredPet() {
    const userData = JSON.parse(localStorage.getItem('lguData'));
    const navigate = useNavigate()
    const [allPets, setAllPets] = useState([]);
    const [showInfo, setShowInfo ] = useState({
        breed:'',
        type:'',
        status:'',
        gender: ''
    });
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
    
              if ((registerLocation === userData.LGU_BranchName || lguAccount === userData.LGU_UserName) && status != "Lost") {
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

    function petFilter(filter) {
          
        if (filter === "all" || filter === "") {
            setFilteredPets(allPets);
        }
        
        if(filter && filter !== "all"){
            setFilteredPets(allPets.filter(pet => pet.species === filter));
        }
    
    }

    function searchFilter(e) {
        let term = e.target.value.toLowerCase();
        if (!term) {
          setFilteredPets(allPets);
        } else {
          setFilteredPets(
            filteredPets.filter(
              (pet) => pet.name.toLowerCase().indexOf(term) !== -1 || pet.id.indexOf(term) !== -1
            )
          );
        }
      }

      const handleBreedChange = (event) => {
        const { name, value } = event.target;
        setShowInfo({ ...showInfo, [name]: value });
      
        if(name === "breed"){
            filterPets(value, showInfo.gender, showInfo.type, showInfo.status);
        }
      };
      
      const handleGenderChange = (event) => {
        const { name, value } = event.target;
        setShowInfo({ ...showInfo, [name]: value });
        
        if(name === "gender"){
            filterPets(showInfo.breed, value, showInfo.type, showInfo.status);
        }
      };
      
      const handleTypeChange = (event) => {
        const { name, value } = event.target;
        setShowInfo({ ...showInfo, [name]: value });

        if(name === "type"){
            filterPets(showInfo.breed, showInfo.gender, value, showInfo.status);
        }
      };
      
      const handleStatusChange = (event) => {
        const { name, value } = event.target;
        setShowInfo({ ...showInfo, [name]: value });

        if(name === "status"){
            filterPets(showInfo.breed, showInfo.gender, showInfo.type, value);
        }
      };
      
      function filterPets(breedFilter, genderFilter, registerTypeFilter, statusFilter) {

        console.log("Breed: " + breedFilter);
        console.log("Gender: " + genderFilter);
        console.log("Type: " + registerTypeFilter);
        console.log("Status: " + statusFilter);
        setFilteredPets(
          allPets.filter((pet) =>
            (breedFilter ? pet.breed === breedFilter : true) &&
            (genderFilter ? pet.gender === genderFilter : true) &&
            (registerTypeFilter ? pet.registerType === registerTypeFilter : true) &&
            (statusFilter ? pet.status === statusFilter : true)
          )
        );
      }
      

  return (
    <div className='main-bg'>
        <LguNavbar/>
        <ToastContainer/>
        <div className="main-content">
            
            <header>
                <h1>
                    LGU Registered Pets
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
                    <Col>
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
                <Row>
                    <Col className='dropdown-padding'>
                        <Row>
                            <Form.Select
                                name="breed"
                                id="breed"
                                value={showInfo.breed}
                                onChange={handleBreedChange}
                                >
                                <option value="">Select Breed</option>
                                {allPets.map((doc) => (
                                    <option key={doc.id} value={doc.breed}>
                                    {doc.breed}
                                    </option>
                                ))}
                            </Form.Select>
                        </Row>
                    </Col>
                    <Col className='dropdown-padding' xs={3}>
                        <Row>
                            <Form.Select
                                name="type"
                                id="type"
                                value={showInfo.type}
                                onChange={handleTypeChange}
                                >
                                <option value="">Select Register Type</option>
                                <option value="Annual">Annual</option>
                                <option value="Perpetual">Perpetual</option>
                            </Form.Select>
                        </Row>
                    </Col>
                    <Col className='dropdown-padding'>
                        <Row>
                            <Form.Select
                                name="status"
                                id="status"
                                value={showInfo.status}
                                onChange={handleStatusChange}
                                >
                                <option value="">Select Status</option>
                                <option value="Owned">Owned</option>
                                <option value="Sale">For Sale</option>
                                <option value="Adoption">For Adoption</option>
                            </Form.Select>
                        </Row>
                    </Col>
                    <Col className='dropdown-padding'>
                        <Row>
                            <Form.Select
                                name="gender"
                                id="gender"
                                value={showInfo.gender}
                                onChange={handleGenderChange}
                                >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Select>
                        </Row>
                    </Col>
                    <Col  xs={1}>
                        <Row>
                            <a>
                                <div className="pet-wrapper" onClick={() => petFilter("Canine")}>
                                    <button type="button" className="add">
                                        <FontAwesomeIcon icon={faDog} bounce />
                                    </button>
                                </div>
                            </a>
                        </Row>
                    </Col>
                    <Col xs={1}>
                        <Row>
                            <a>
                                <div className="pet-wrapper" onClick={() => petFilter("Feline")}>
                                    <button type="button" className="add">
                                        <FontAwesomeIcon icon={faCat} bounce />
                                    </button>
                                </div>
                            </a>
                        </Row>
                    </Col>
                    <Col xs={1}>
                        <Row>
                            <a>
                                <div className="pet-wrapper"onClick={() => petFilter("all")}>
                                    <button type="button" className="add">
                                    <FontAwesomeIcon icon={faDog} bounce />
                                    <FontAwesomeIcon icon={faCat} bounce />
                                    </button>
                                </div>
                            </a>
                        </Row>
                    </Col>
                </Row>
                <AddLguPets
                    showmodal1 = {showAddModal}
                    hidemodal1 = {() => setShowAddModal(false)}
                    showmodal1handler = {onClickAddPet}
                />
                <div className="rowCard">
                    {filteredPets.map((doc) => (
                        <div className="pet-card" key={doc.id} onClick={() => navigate("/lgu-pet-profile", {state: {filteredPets, doc}} )}>
                            <a>
                                <img src={doc.url} alt="profile"/>
                                <div>
                                    <h4 className='name-transform'><center><b>{doc.name}</b></center></h4> 
                                </div>
                            </a>   
                        </div>
                    ))}
                </div>
            </div>	
        </div>
    </div>	
  )
}

export default LguRegisteredPet