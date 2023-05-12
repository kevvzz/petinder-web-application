import React, { useState,useEffect } from 'react'
import {LguNavbar} from '../Navbar/Navbar';
import {Row, Col} from 'react-bootstrap'
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import DeleteAuthenticate from '../Modal/DeleteAuthenticate';
import EditLguOwner from './EditLguOwner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faDog, faCat, faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate,useLocation} from 'react-router-dom';

function LguPetOwnerProfile() {
    const location = useLocation();
    const data = location.state.doc;

    const [ownerProfile, setOwnerProfile] = useState({
      email: '', 
      lastName: '',
      firstName: '',
      middleName: '', 
      address: '', 
      age: '', 
      birthdate: '', 
      contact: '', 
      dateRegister:'', 
      gender: '', 
      location: '' 
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [filterPet, setFilterPet] = useState([]);
    
    function onClickEditOwner() {
        setShowAddModal(true);
    }
    function onClickDeletePet() {
      setShowDeleteModal(true);
    }
    useEffect(() => {
      const docRef = db.collection("PetLovers_Profile").doc(data.email);
      docRef.get()
        .then((doc) => {
          if (doc.exists) {
            const owner = doc.data();
            const { PL_Address,
            PL_Age,
            PL_BirthDate,
            PL_ContactNumber,
            PL_DateRegistered,
            PL_FirstName,
            PL_Gender,
            PL_LastName,
            PL_MiddleName,
            PL_NearbyDVMFLoc,
            PL_OwnedPets,
            PL_UserEmail } = owner;
  
            setOwnerProfile({ 
              email: PL_UserEmail, 
              lastName: PL_LastName,
              firstName: PL_FirstName,
              middleName: PL_MiddleName, 
              address: PL_Address, 
              age: PL_Age, 
              birthdate: PL_BirthDate, 
              contact: PL_ContactNumber, 
              dateRegister: PL_DateRegistered, 
              gender: PL_Gender, 
              location: PL_NearbyDVMFLoc
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }, []);

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
            
            console.log("owner:", owner);
            console.log("data.email:", data.email);

            if (owner === data.email) {
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
            setFilterPet(data.filter((item) => item !== null));
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
  }, []);


    const register = new Date(ownerProfile.dateRegister.seconds * 1000 + ownerProfile.dateRegister.nanoseconds / 1000000);
    const birth = new Date(ownerProfile.birthdate.seconds * 1000 + ownerProfile.birthdate.nanoseconds / 1000000);
    const birthString = birth.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric'});
    const registerString = register.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'});
  return (
    <div className='main-bg'>
      <LguNavbar/>
      <ToastContainer/>
      <div className="main-content">
        <header>
            <h1>
                LGU Pet Owner Profile
            </h1>
        </header>
        <div className='container paddingBottom'>
          <Row>
            <Col>
              <Row className='orange'>
                <Col xs="auto"></Col>
                  <img className='picture' src={data.url} alt="picture"/>
                <Col>
                  <Row><Col className='center'><div className='petName'>{(ownerProfile.firstName+" "+ownerProfile.lastName)}</div></Col></Row>
                </Col>
              </Row>
              <Row>
                <Col className='marginTop' xs={3}>
                  <Row className="button-wrapper">
                    <Col className='center'><button type="button" className="add" onClick={onClickEditOwner}><FontAwesomeIcon icon={faFileCirclePlus}/><span> </span>UPDATE</button></Col>
                  </Row>
                  <Row className="button-wrapper">
                    <Col className='center'><button type="button" className="add" onClick={onClickDeletePet}><FontAwesomeIcon icon={faFileCirclePlus}/><span> </span>DELETE</button></Col>
                  </Row>
                </Col>
                <Col className='mt-4'>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Address:</Col>
                    <Col xs={6}>{ownerProfile.address}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>AGE:</Col>
                    <Col xs={6}>{ownerProfile.age}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>BirthDate:</Col>
                    <Col xs={6}>{birthString}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Contact Number:</Col>
                    <Col xs={6}>{ownerProfile.contact}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Date Registered:</Col>
                    <Col xs={6}>{registerString}</Col>
                  </Row>
                </Col>
                <Col className='mt-4'>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Gender:</Col>
                    <Col xs={6}>{ownerProfile.gender}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>DVMF Location:</Col>
                    <Col xs={6}>{ownerProfile.location}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Owned Pets:</Col>
                    <Col xs={6}>3</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Email Address:</Col>
                    <Col xs={6}>{ownerProfile.email}</Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='mt-10'>
            <div className='vaccine'>Registered Pets</div>
          </Row>
          <Row>
            <Col>
              <div className="rowCard">
                    {filterPet.map((doc) => (
                        <div className="pet-card" key={doc.id}>
                            <a>
                                <img src={doc.url} alt="profile"/>
                                <div>
                                    <h4 className='name-transform'><center><b>{doc.name}</b></center></h4> 
                                </div>
                            </a>   
                        </div>
                    ))}
                </div>
            </Col>
          </Row>
          
        </div>
        <DeleteAuthenticate
              name = {(ownerProfile.firstName+" "+ownerProfile.lastName)}
              show = {showDeleteModal}
              hide = {() => setShowDeleteModal(false)}
              // remover = {handleRemove}
              data = {data}
              setShowDeleteModal = {setShowDeleteModal}
              collectionName = "PetLovers_Profile"
              storageName = "PetLover"
              navigate = "/lgu-owner"
          />
        <EditLguOwner
            showmodal = {showAddModal}
            hidemodal = {setShowAddModal}
            showmodalhandler = {onClickEditOwner}
            ownerProfile = {ownerProfile}
            data = {data}
            setOwnerProfile = {setOwnerProfile}
        />
      </div>
    </div>
  
  )
}

export default LguPetOwnerProfile