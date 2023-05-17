import React, { useState,useEffect } from 'react'
import {LguNavbar} from '../Navbar/Navbar';
import {Row, Col, InputGroup, Form} from 'react-bootstrap'
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faDog, faCat, faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function LguLostPet() {
    const userData = JSON.parse(localStorage.getItem('lguData'));
    const navigate = useNavigate()
    const [allPets, setAllPets] = useState([]);
    const [allLgu, setAllLgu] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [showInfo, setShowInfo ] = useState({
        breed:'',
        type:'',
        lgu:'',
        gender: ''
    });

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
    
              if (status === "Lost") {
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
      
      useEffect(() => {
        db.collection("LGU_Profile")
          .get()
          .then((querySnapshot) => {
            const branches = [];
            querySnapshot.forEach((doc) => {
              const branch = doc.data().LGU_BranchName;
              branches.push(branch);
            });
      
            setAllLgu(branches);
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
        allPets.filter(
          (pet) => pet.name.toLowerCase().indexOf(term) !== -1 || pet.id.indexOf(term) !== -1 || pet.color.indexOf(term) !== -1
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
    const handleBreedChange = (event) => {
        const { name, value } = event.target;
        setShowInfo({ ...showInfo, [name]: value });
      
        if(name === "breed"){
            filterPets(value, showInfo.gender, showInfo.type, showInfo.lgu);
        }
      };
      
      const handleGenderChange = (event) => {
        const { name, value } = event.target;
        setShowInfo({ ...showInfo, [name]: value });
        
        if(name === "gender"){
            filterPets(showInfo.breed, value, showInfo.type, showInfo.lgu);
        }
      };
      
      const handleTypeChange = (event) => {
        const { name, value } = event.target;
        setShowInfo({ ...showInfo, [name]: value });

        if(name === "type"){
            filterPets(showInfo.breed, showInfo.gender, value, showInfo.lgu);
        }
      };
      
      const handleLguChange = (event) => {
        const { name, value } = event.target;
        setShowInfo({ ...showInfo, [name]: value });

        if(name === "lgu"){
            filterPets(showInfo.breed, showInfo.gender, showInfo.type, value);
        }
      };
      
      function filterPets(breedFilter, genderFilter, registerTypeFilter, lguFilter) {

        console.log("Breed: " + breedFilter);
        console.log("Gender: " + genderFilter);
        console.log("Type: " + registerTypeFilter);
        console.log("Lgu: " + lguFilter);
        setFilteredPets(
          allPets.filter((pet) =>
            (breedFilter ? pet.breed === breedFilter : true) &&
            (genderFilter ? pet.gender === genderFilter : true) &&
            (registerTypeFilter ? pet.registerType === registerTypeFilter : true) &&
            (lguFilter ? pet.registerLocation === lguFilter : true)
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
                    LGU Lost Pets
                </h1>
            </header>
            <div className="container">
                <Row className='bottomSpace'>
                    {/* <Col  xs={2}>
                        <Row>
                            <div className="button-wrapper" onClick={onClickAddPet}>
                                <button type="button" className="add"><FontAwesomeIcon icon={faFileCirclePlus}/><span> </span>ADD NEW</button>
                            </div>
                        </Row>
                    </Col> */}
                    <Col>
                        <Row>
                            <Col className='center'>
                                <InputGroup className="search-employee">
                                <InputGroup.Text className='icon-part'><FontAwesomeIcon className='glass' icon={faMagnifyingGlass}/></InputGroup.Text>
                                <Form.Control
                                    className="search-part me-3"
                                    type="text"
                                    autoComplete="off"
                                    aria-label="term"
                                    aria-describedby="term"
                                    placeholder="Search Name, Id Number, and Color"
                                    name="term"
                                    id="term"
                                    required
                                    onChange={(e) => searchFilter(e)}
                                    />
                                </InputGroup>
                            </Col>
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
                <Row className='marginBottom'>
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
                                name="lgu"
                                id="lgu"
                                value={showInfo.lgu}
                                onChange={handleLguChange}
                                >
                                <option value="">Select LGU</option>
                                {allLgu.map((doc,index) => (
                                    <option key={index} value={doc}>
                                    {doc}
                                    </option>
                                ))}
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
                </Row>
                <div className="rowCard">
                    {filteredPets.map((doc) => (
                        <div className="pet-card" key={doc.id} onClick={() => navigate("/lgu-lost-pet-profile", {state: {filteredPets, doc}} )}>
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

export default LguLostPet