import React, { useState,useEffect } from 'react'
import {LguNavbar} from '../Navbar/Navbar';
import {Row, Col} from 'react-bootstrap'
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import DeleteAuthenticate from '../Modal/DeleteAuthenticate';
import EditLguSeller from './EditLguSeller';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate,useLocation} from 'react-router-dom';

function LguPetSellerProfile() {
  const navigate = useNavigate()

  const location = useLocation();
  const data = location.state.doc;

  const [sellerProfile, setSellerProfile] = useState({
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
  
  function onClickEditSeller() {
      setShowAddModal(true);
  }
  function onClickDeletePet() {
    setShowDeleteModal(true);
  }
  useEffect(() => {
    const docRef = db.collection("PetSellerorAdoption_Profile").doc(data.email);
    docRef.get()
      .then((doc) => {
        if (doc.exists) {
          const seller = doc.data();
          const { PSA_Address,
          PSA_Age,
          PSA_BirthDate,
          PSA_ContactNumber,
          PSA_DateRegistered,
          PSA_FirstName,
          PSA_Gender,
          PSA_LastName,
          PSA_MiddleName,
          PSA_NearbyDVMFLoc,
          PSA_OwnedPets,
          PSA_UserEmail } = seller;

          setSellerProfile({ 
            email: PSA_UserEmail, 
            lastName: PSA_LastName,
            firstName: PSA_FirstName,
            middleName: PSA_MiddleName, 
            address: PSA_Address, 
            age: PSA_Age, 
            birthdate: PSA_BirthDate, 
            contact: PSA_ContactNumber, 
            dateRegister: PSA_DateRegistered, 
            gender: PSA_Gender, 
            location: PSA_NearbyDVMFLoc
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

  function handleRemove(e) {
    // Delete the document from Firestore
    db.collection('PetSellerorAdoption_Profile')
    .doc(data.email)
    .delete()

    // Delete the image from Storage
    const photoRef = storage.ref().child(`PetSellerOrAdoption/${data.email}`);
    photoRef.delete()
    .then(() => {
      toast.success("Pet Profile Deleted Successfully!");
      setShowDeleteModal(false);
      setTimeout(() => {
        navigate("/lgu-seller"); 
      }, 2000); 
      console.log("success");
    })
    .catch((error) => {
      toast.error("Error deleting pet to Firestore: ");
      console.log(error)
    });
  }


  const register = new Date(sellerProfile.dateRegister.seconds * 1000 + sellerProfile.dateRegister.nanoseconds / 1000000);
  const birth = new Date(sellerProfile.birthdate.seconds * 1000 + sellerProfile.birthdate.nanoseconds / 1000000);
  const birthString = birth.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric'});
  const registerString = register.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'});
return (
  <div className='main-bg'>
    <LguNavbar/>
    <ToastContainer/>
    <div className="main-content">
      <header>
          <h1>
              LGU Pet Seller Profile
          </h1>
      </header>
      <div className='container paddingBottom'>
        <Row>
          <Col>
            <Row className='orange'>
              <Col xs="auto"></Col>
                <img className='picture' src={data.url} alt="picture"/>
              <Col>
                <Row><Col className='center'><div className='petName'>{(sellerProfile.firstName+" "+sellerProfile.lastName)}</div></Col></Row>
              </Col>
            </Row>
            <Row>
              <Col className='marginTop' xs={3}>
                <Row className="button-wrapper">
                  <Col className='center'><button type="button" className="add" onClick={onClickEditSeller}><FontAwesomeIcon icon={faFileCirclePlus}/><span> </span>UPDATE</button></Col>
                </Row>
                <Row className="button-wrapper">
                  <Col className='center'><button type="button" className="add" onClick={onClickDeletePet}><FontAwesomeIcon icon={faFileCirclePlus}/><span> </span>DELETE</button></Col>
                </Row>
              </Col>
              <Col className='mt-4'>
                <Row className="button-wrapper mb-2">
                  <Col className='bold' xs={4}>Address:</Col>
                  <Col xs={6}>{sellerProfile.address}</Col>
                </Row>
                <Row className="button-wrapper mb-2">
                  <Col className='bold' xs={4}>AGE:</Col>
                  <Col xs={6}>{sellerProfile.age}</Col>
                </Row>
                <Row className="button-wrapper mb-2">
                  <Col className='bold' xs={4}>BirthDate:</Col>
                  <Col xs={6}>{birthString}</Col>
                </Row>
                <Row className="button-wrapper mb-2">
                  <Col className='bold' xs={4}>Contact Number:</Col>
                  <Col xs={6}>{sellerProfile.contact}</Col>
                </Row>
                <Row className="button-wrapper mb-2">
                  <Col className='bold' xs={4}>Date Registered:</Col>
                  <Col xs={6}>{registerString}</Col>
                </Row>
              </Col>
              <Col className='mt-4'>
                <Row className="button-wrapper mb-2">
                  <Col className='bold' xs={4}>Gender:</Col>
                  <Col xs={6}>{sellerProfile.gender}</Col>
                </Row>
                <Row className="button-wrapper mb-2">
                  <Col className='bold' xs={4}>DVMF Location:</Col>
                  <Col xs={6}>{sellerProfile.location}</Col>
                </Row>
                <Row className="button-wrapper mb-2">
                  <Col className='bold' xs={4}>Owned Pets:</Col>
                  <Col xs={6}>3</Col>
                </Row>
                <Row className="button-wrapper mb-2">
                  <Col className='bold' xs={4}>Email Address:</Col>
                  <Col xs={6}>{sellerProfile.email}</Col>
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
            name = {(sellerProfile.firstName+" "+sellerProfile.lastName)}
            show = {showDeleteModal}
            hide = {() => setShowDeleteModal(false)}
            // remover = {handleRemove}
            data = {data}
            setShowDeleteModal = {setShowDeleteModal}
            collectionName = "PetSellerorAdoption_Profile"
            storageName = "PetSellerOrAdoption"
            navigate = "/lgu-seller"
            email = {sellerProfile.email}
        />
      <EditLguSeller
          showmodal = {showAddModal}
          hidemodal = {setShowAddModal}
          showmodalhandler = {onClickEditSeller}
          sellerProfile = {sellerProfile}
          data = {data}
          setSellerProfile = {setSellerProfile}
      />
    </div>
  </div>

)
}

export default LguPetSellerProfile