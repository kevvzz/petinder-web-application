import React, { useState,useEffect } from 'react'
import {AdminNavbar} from '../Navbar/Navbar';
import {Row, Col, InputGroup, Form} from 'react-bootstrap'
import { Table, thead, tbody, tr, th, td } from 'react-bootstrap';
import picture from '../../Assets/bingo.jpg'
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';


import DeleteModal from '../Modal/DeleteModal';
import EditAdminSeller from './EditAdminSeller';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faDog, faCat, faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate,useLocation} from 'react-router-dom';

function AdminSellerProfile() {
    const navigate = useNavigate()

    const location = useLocation();
    console.log(location.state);
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
          console.log(doc);
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
					navigate("/admin-seller"); 
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
      <AdminNavbar/>
      <ToastContainer/>
      <div className="main-content">
        <header>
            <h1>
                Admin Pet Seller Profile
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
          
        </div>
        <DeleteModal
              name = "PET SELLER"
              show = {showDeleteModal}
              hide = {() => setShowDeleteModal(false)}
              remover = {handleRemove}
          />
        <EditAdminSeller
            showmodal = {showAddModal}
            hidemodal = {setShowAddModal}
            showmodalhandler = {onClickEditSeller}
            sellerProfile = {sellerProfile}
            setSellerProfile = {setSellerProfile}
        />
      </div>
    </div>
  
  )
}

export default AdminSellerProfile